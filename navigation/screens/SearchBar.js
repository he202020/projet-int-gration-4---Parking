import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';

const data = [
  { parking_id: '1', parking_name: 'Magritte', parking_opening_hour: '08:30:00', parking_closure_hour: '18:00:00', parking_address: 'Av. du Ciseau 10, 1348 Ottignies-Louvain-la-Neuve', parking_maximum_place: 50 },
  { parking_id: '2', parking_name: 'Leclercq', parking_opening_hour: '09:00:00', parking_closure_hour: '19:00:00', parking_address: 'Bd du S, 1348 Ottignies-Louvain-la-Neuve', parking_maximum_place: 60 },
  { parking_id: '3', parking_name: 'Wallons', parking_opening_hour: '07:00:00', parking_closure_hour: '16:30:00', parking_address: '1348 Ottignies-Louvain-la-Neuve', parking_maximum_place: 55 },
  { parking_id: '4', parking_name: 'Brol', parking_opening_hour: '08:00:00', parking_closure_hour: '16:00:00', parking_address: 'hgjhfjhgfjf', parking_maximum_place: 120 },
];

const HomeScreen = () => {
  const [parkingData, setParkingData] = useState(data);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        Parking: {item.parking_name} {'\n\n'}
        {item.parking_maximum_place} places max {'\n\n'}{'\n\n'}
      </Text>
    </View>
  );

  const searchName = (input) => {
    const searchData = data.filter((item) =>
      item.parking_name.toLowerCase().includes(input.toLowerCase())
    );
    setParkingData(searchData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher"
          onChangeText={(input) => {
            searchName(input);
          }}
        />
      </View>

      <FlatList
        data={parkingData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2', // Light gray background color
  },
  searchContainer: {
    paddingVertical: 10,
    width: '100%',
    marginBottom: 16, // Add spacing at the bottom
  },
  searchInput: {
    paddingHorizontal: 16, // Increased horizontal padding
    height: 48, // Increased height
    borderColor: '#ccc', // Light gray border color
    borderWidth: 1,
    borderRadius: 24, // Rounder input box
    backgroundColor: '#ffffff',
    fontSize: 16,
    width: '100%',
    shadowColor: '#000', // Add shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  itemContainer: {
    backgroundColor: '#222', // Darker background color
    padding: 16, // Increased padding
    marginBottom: 16, // Add spacing at the bottom
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000', // Add shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  itemText: {
    textAlign: 'center',
    fontWeight: 'bold', // Use bold font weight
    color: 'white',
    fontSize: 18, // Increase font size
  },
});


export default HomeScreen;
