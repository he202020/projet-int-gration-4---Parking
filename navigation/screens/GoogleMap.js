import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';

const data = [
{ parking_id: '1', parking_name: 'Magritte', parking_opening_hour: '08:30:00', parking_closure_hour: '18:00:00', parking_address: 'Av. du Ciseau 10, 1348 Ottignies-Louvain-la-Neuve', parking_maximum_place: 50, longitude: 4.611498, latitude: 50.665886 },
  { parking_id: '2', parking_name: 'Leclercq', parking_opening_hour: '09:00:00', parking_closure_hour: '19:00:00', parking_address: 'Bd du S, 1348 Ottignies-Louvain-la-Neuve', parking_maximum_place: 60,longitude:4.612858,latitude:50.666845 },
  { parking_id: '3', parking_name: 'Wallons', parking_opening_hour: '07:00:00', parking_closure_hour: '16:30:00', parking_address: '1348 Ottignies-Louvain-la-Neuve', parking_maximum_place: 55,longitude:4.617058,latitude: 50.669534},

];

const GoogleMap = () => {
  const route = useRoute();
  const selectedParking = route.params?.selectedParking;

  const initialRegion = {
    latitude: selectedParking?.latitude || data[0].latitude,
    longitude: selectedParking?.longitude || data[0].longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {data.map((parking) => (
          <Marker
            key={parking.parking_id}
            coordinate={{ latitude: parking.latitude, longitude: parking.longitude }}
            title={parking.parking_name}
          />
        ))}
        {selectedParking && (
          <Marker
            coordinate={{
              latitude: selectedParking.latitude,
              longitude: selectedParking.longitude,
            }}
            title={selectedParking.parking_name}
            pinColor="purple" // Optional: You can customize the pin color for the selected parking
          />
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
});

export default GoogleMap;
