import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList , TouchableOpacity} from 'react-native';

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
          {item.parking_maximum_place} places max {'\n\n'}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => GoParking(item)}>
          <Text style={styles.buttonText}>Aller au parking</Text>
        </TouchableOpacity>
      </View>
  );

  const searchName = (input) => {
    const searchData = data.filter((item) =>
      item.parking_name.toLowerCase().includes(input.toLowerCase())
    );
    setParkingData(searchData);
  };

  const GoParking = (parking) => {
      // Implement the logic to navigate to the parking screen here
      // You can use navigation libraries like react-navigation or react-native-navigation
    console.log('Aller au parking : ', parking.parking_name);
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
    backgroundColor: '#333', // Darker background color
    padding: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    color: '#fff', // White text color
    backgroundColor: '#444', // Darker input background color
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#555', // Slightly lighter border color
    paddingVertical: 12,
    borderRadius: 8, // Border radius for item container
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#fff', // White text color
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});


export default HomeScreen;
