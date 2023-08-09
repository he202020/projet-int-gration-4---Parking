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



const GoogleMap = () => {
  const [parkingData, setParkingData] = useState([]);
  const { params } = useRoute();
  const { selectedParking } = params || {};
  const navigation = useNavigation();

  useEffect(() => {
    fetchParkingData();
  }, []);

  const fetchParkingData = async () => {
    try {
      const response = await fetch(
        "https://815a-2a02-a03f-635e-3f00-9154-f937-30e8-42b8.ngrok-free.app/parking"
      );
      const parkingData = await response.json();
      setParkingData(parkingData);
    } catch (error) {
      console.error("Error fetching parking parkingData:", error);
    }
  };

  const renderCallout = (parking) => (
    <Callout tooltip={true} onPress={() => handleReservation(parking.id)}>
      <View style={styles.calloutContainer}>
        <Text style={styles.parkingName}>{parking.name}</Text>
        <Text style={styles.availableSpaces}>Places libres : {parking.max}</Text>
        <TouchableOpacity style={styles.reserveButton}>
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

  const handleReservation = (parkingId) => {
    console.log("Navigating to Reservation with parking:", parkingId);
    navigation.navigate("Reservation", { id: parkingId });
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