import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';

const data = [
  { parking_id: '1', parking_name: 'Magritte', parking_opening_hour: '08:30:00', parking_closure_hour: '18:00:00', parking_address: 'Av. du Ciseau 10, 1348 Ottignies-Louvain-la-Neuve', parking_maximum_place: 50, longitude: 4.611498, latitude: 50.665886 },
  { parking_id: '2', parking_name: 'Leclercq', parking_opening_hour: '09:00:00', parking_closure_hour: '19:00:00', parking_address: 'Bd du S, 1348 Ottignies-Louvain-la-Neuve', parking_maximum_place: 60, longitude: 4.612858, latitude: 50.666845 },
  { parking_id: '3', parking_name: 'Wallons', parking_opening_hour: '07:00:00', parking_closure_hour: '16:30:00', parking_address: '1348 Ottignies-Louvain-la-Neuve', parking_maximum_place: 55, longitude: 4.617058, latitude: 50.669534 },
];


const renderCallout = (parking, handleReservation) => (
  <Callout>
    <View style={styles.calloutContainer}>
      <Text style={styles.parkingName}>{parking.parking_name}</Text>
      <Text style={styles.availableSpaces}>
        Available Spaces: {parking.parking_maximum_place}
      </Text>
      <TouchableOpacity style={styles.reserveButton} onPress={() => handleReservation(parking)}>
        <Text style={styles.reserveButtonText}>Reserver une place</Text>
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

  const handleReservation = (parking) => {
    navigation.navigate('Reservation', { parking });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {showMarkers &&
          data.map((parking) => (
            <Marker
              key={parking.parking_id}
              coordinate={{ latitude: parking.latitude, longitude: parking.longitude }}
              title={parking.parking_name}
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
            title={selectedParking.parking_name}
            pinColor="purple"
          >
            {renderCallout(selectedParking, handleReservation)}
          </Marker>
        )}
      </MapView>
      <TouchableOpacity style={styles.toggleButton} onPress={handleToggleMarkers}>
        <Text style={styles.toggleButtonText}>
          {showMarkers ? 'Aucun Parkings' : 'Tous les Parkings'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutContainer: {
    backgroundColor: '#000', // Black background color
    padding: 13,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parkingName: {
    color: 'white', // Orange text color
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  availableSpaces: {
    color: 'white',
    fontSize: 14,
  },
  reserveButton: {
    backgroundColor: '#ff6600', // Orange button background color
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  reserveButtonText: {
    color: 'white', // White text color for the button
    fontSize: 16,
    textAlign: 'center',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#ff6600',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default GoogleMap;
