import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import axios from "axios"; // Import axios
import Reservation from "./Reservation";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GoogleMap = ({ navigation, route }) => {
  const { numberplate } = route.params || {};
  const [parkingData, setParkingData] = useState([]);
  const { selectedParkingId } = route.params || {};
  const [selectedParking, setSelectedParking] = useState(null);
  const { params } = useRoute();
  //const { selectedParking } = params || {};
  const [userLocation, setUserLocation] = useState(null); //stocker les coordonnées GPS de l'appareil`
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching === true){
      fetchParkingData().then(setFetching(false));
    }
    getUserLocation();
    setSelectedParking(selectedParkingId);
  }, []);

  const fetchParkingData = async () => {
    try {
      const response = await axios.get(
        "https://4db5-2a02-a03f-c09c-b00-64e2-9c33-1e3c-42fd.ngrok-free.app/parking"
      );
      setParkingData(response.data);
    } catch (error) {
      console.error("Error fetching parking parkingData:", error);
    }
  };

  // Obtenir l'emplacement actuel de l'utilisateur à l'aide du module Location d'Expo
  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("L'autorisation d'accéder à la position a été refusée");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setUserLocation({ latitude, longitude });
  };

  const renderCallout = (parking, distanceToUser) => (
    <Callout
      tooltip={true}
      onPress={() => handleReservation(parking.id, parking.name)}
    >
      <View style={styles.calloutContainer}>
        <Text style={styles.parkingName}>{parking.name}</Text>
        <Text style={styles.availableSpaces}>
          Places libres : {parking.nbr_free_spaces}
        </Text>
        {distanceToUser && (
          <Text style={styles.distanceToUser}>
            Distance : {distanceToUser.toFixed(2)} km
          </Text>
        )}
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

  const handleReservation = (parkingId, parkingName) => {
    
    console.log("Navigating to Reservation with parking:", parkingId);
    setSelectedParking({ id: parkingId, name: parkingName });
    //navigation.navigate("Reservation", { id: parkingId });
    navigation.navigate("Reservation", {
      selectedParking: { id: parkingId, name: parkingName },
    });
    console.log(parkingId,parkingName  );
  };

  // Calcule la distance entre deux points à l'aide de la formule Haversine
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  // Convertit les degrés en radians
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Votre Position"
            pinColor="blue"
          />
        )}

        {showMarkers &&
          parkingData.map((parking) => {
            const isSelected = parking.id === selectedParking; // Check if this marker is selected
            const distanceToUser = userLocation
              ? calculateDistance(
                  userLocation.latitude,
                  userLocation.longitude,
                  parking.latitude,
                  parking.longitude
                )
              : null;
            return (
              <Marker
                key={parking.id}
                coordinate={{
                  latitude: parking.latitude,
                  longitude: parking.longitude,
                }}
                title={parking.name}
                pinColor={isSelected ? "green" : "red"} // Change pin color based on selection
              >
                {renderCallout(parking, distanceToUser)}
              </Marker>
            );
          })}
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
  distanceToUser: {
    color: "white",
  },
});

export default GoogleMap;
