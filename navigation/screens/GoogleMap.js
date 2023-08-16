import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useRoute, useNavigation } from "@react-navigation/native";

import axios from "axios"; // Import axios
import Reservation from "./Reservation";

const GoogleMap = ({ navigation }) => {
  const [parkingData, setParkingData] = useState([]);
  const [selectedParking, setSelectedParking] = useState(null);
  const { params } = useRoute();
  //const { selectedParking } = params || {};

  useEffect(() => {
    fetchParkingData();
  }, []);

  const fetchParkingData = async () => {
    try {
      const response = await fetch(
        "https://7e6c-2a02-a03f-635e-3f00-dd57-fda7-f5c0-17c5.ngrok-free.app/parking"
      );
      const parkingData = await response.json();
      setParkingData(parkingData);
    } catch (error) {
      console.error("Error fetching parking parkingData:", error);
    }
  };

  const renderCallout = (parking) => (
    <Callout tooltip={true} onPress={() => handleReservation(parking.id, parking.name)}>
      <View style={styles.calloutContainer}>
        <Text style={styles.parkingName}>{parking.name}</Text>
        <Text style={styles.availableSpaces}>Places libres : {parking.nbr_free_spaces}</Text>
        <TouchableOpacity
          style={styles.reserveButton}
          onPress={() => handleReservation(parking.id, parking.name)}
        >
          <Text style={styles.reserveButtonText}>Réserver une place</Text>
        </TouchableOpacity>
      </View>
    </Callout>
  );
  

  const initialRegion = {
    latitude: 50.668121,
    longitude: 4.614747,
    latitudeDelta: 0.001, // Adjust this value for the desired zoom level
    longitudeDelta: 0.01, // Adjust this value for the desired zoom level
  };

  const [showMarkers, setShowMarkers] = useState(true);

  const handleToggleMarkers = () => {
    setShowMarkers(!showMarkers);
  };

  const handleReservation = (parkingId,parkingName) => {
    console.log("Navigating to Reservation with parking:", parkingId);
    setSelectedParking({ id: parkingId, name: parkingName });
    //navigation.navigate("Reservation", { id: parkingId });
    navigation.navigate('Reservation', { selectedParking: { id: parkingId, name: parkingName } });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {showMarkers &&
          parkingData.map((parking) => (
            <Marker
              key={parking.id}
              coordinate={{
                latitude: parking.latitude,
                longitude: parking.longitude,
              }}
              title={parking.name}
            >
              {renderCallout(parking)}
            </Marker>
          ))}
      </MapView>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={handleToggleMarkers}
      >
        <Text style={styles.toggleButtonText}>
          {showMarkers ? "Aucun Parkings" : "Tous les Parkings"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutContainer: {
    backgroundColor: "#000", // Black background color
    padding: 13,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  parkingName: {
    color: "white", // Orange text color
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  availableSpaces: {
    color: "white",
    fontSize: 14,
  },
  reserveButton: {
    backgroundColor: "#ff6600", // Orange button background color
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  reserveButtonText: {
    color: "white", // White text color for the button
    fontSize: 16,
    textAlign: "center",
  },
  toggleButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#ff6600",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  toggleButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default GoogleMap;
