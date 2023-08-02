import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';

const data = [
  // Your parking data here...
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

  const handleReservation = (parking) => {
    navigation.navigate('Reservation', { parking });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {data.map((parking) => (
          <Marker
            key={parking.parking_id}
            coordinate={{ latitude: parking.latitude, longitude: parking.longitude }}
            title={parking.parking_name}
          >
            {renderCallout(parking, handleReservation)}
          </Marker>
        ))}
        {selectedParking && (
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
});

export default GoogleMap;
