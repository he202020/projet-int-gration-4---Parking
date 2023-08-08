import React, { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useRoute, useNavigation } from "@react-navigation/native";
import Reservation from "./Reservation";

const data = [
  {
    id: "1",
    name: "Magritte",
    opening: "08:30:00",
    closure: "18:00:00",
    address: "Av. du Ciseau 10, 1348 Ottignies-Louvain-la-Neuve",
    max: 50,
    longitude: 4.611498,
    latitude: 50.665886,
  },
  {
    id: "2",
    name: "Leclercq",
    opening: "09:00:00",
    closure: "19:00:00",
    address: "Bd du S, 1348 Ottignies-Louvain-la-Neuve",
    max: 60,
    longitude: 4.612858,
    latitude: 50.666845,
  },
  {
    id: "3",
    name: "Wallons",
    opening: "07:00:00",
    closure: "16:30:00",
    address: "1348 Ottignies-Louvain-la-Neuve",
    max: 55,
    longitude: 4.617058,
    latitude: 50.669534,
  },
];

const renderCallout = (parking, handleReservation) => (
  <Callout>
    <View style={styles.calloutContainer}>
      <Text style={styles.parkingName}>{parking.name}</Text>
      <Text style={styles.availableSpaces}>Places libres : {parking.max}</Text>
      <TouchableOpacity
        style={styles.reserveButton}
        onPress={() => handleReservation(parking)}
      >
        <Text style={styles.reserveButtonText}>Réserver une place</Text>
      </TouchableOpacity>
    </View>
  </Callout>
);

const GoogleMap = () => {
  const { params } = useRoute();
  const { selectedParking } = params || {};
  const navigation = useNavigation();

  const initialRegion = {
    latitude: selectedParking?.latitude || data[0].latitude,
    longitude: selectedParking?.longitude || data[0].longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [showMarkers, setShowMarkers] = useState(true);

  const handleToggleMarkers = () => {
    setShowMarkers(!showMarkers);
  };

  /*const handleReservation = (parking) => {
    navigation.navigate("Reservation", { parking });
  };*/

  const handleReservation = (parking) => {
    navigation.navigate("Reservation", { parkingId: parking.id });
  };
  
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {showMarkers &&
          data.map((parking) => (
            <Marker
              key={parking.id}
              coordinate={{
                latitude: parking.latitude,
                longitude: parking.longitude,
              }}
              title={parking.name}
            >
              {renderCallout(parking, handleReservation)}
            </Marker>
          ))}
        {selectedParking && showMarkers && (
          <Marker
            coordinate={{
              latitude: selectedParking.latitude,
              longitude: selectedParking.longitude,
            }}
            title={selectedParking.name}
            pinColor="purple"
          >
            {renderCallout(selectedParking, handleReservation)}
          </Marker>
        )}
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
