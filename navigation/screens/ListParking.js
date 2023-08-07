import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList , TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const data = [
   { id: '1', name: 'Magritte', opening: '08:30:00', closure: '18:00:00', address: 'Av. du Ciseau 10, 1348 Ottignies-Louvain-la-Neuve', max: 50, longitude: 4.611498, latitude: 50.665886 },
  { id: '2', name: 'Leclercq', opening: '09:00:00', closure: '19:00:00', address: 'Bd du S, 1348 Ottignies-Louvain-la-Neuve', max: 60,longitude:4.612858,latitude:50.666845 },
  { id: '3', name: 'Wallons', opening: '07:00:00', closure: '16:30:00', address: '1348 Ottignies-Louvain-la-Neuve', max: 55,longitude:4.617058,latitude: 50.669534},
];

const ListParking = () => {
  const navigation = useNavigation();
  const [parkingData, setParkingData] = useState(data);
  // Ajoute l'état sélectionnéParking
  const [selectedParking, setSelectedParking] = useState(null);

  const renderItem = ({ item }) => (

      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Parking: {item.name} {'\n\n'}
          {item.max} places max {'\n\n'}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => GoParking(item)}>
          <Text style={styles.buttonText}>Aller au parking</Text>
        </TouchableOpacity>
      </View>
  );

  const searchName = (input) => {
    const searchData = data.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setParkingData(searchData);
  };

  const GoParking = (parking) => {
      // Implement the logic to navigate to the parking screen here
      // You can use navigation libraries like react-navigation or react-native-navigation
    console.log('Aller au parking : ', parking.name);
    // Définit l'état sélectionnéParking
    setSelectedParking(parking);
    navigation.navigate('GoogleMap', { selectedParking: parking });
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
    backgroundColor: '#1a1a1a', // Dark background color
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#333', // Dark background color for each item
    borderRadius: 10, // Rounded borders
    padding: 16,
    marginBottom: 12,
  },
  itemText: {
    color: '#fff', // White text color
    fontSize: 16,
  },
  button: {
    backgroundColor: 'orange', // Orange button background color
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff', // White text color for the button
    fontSize: 16,
    textAlign: 'center',
  },
  searchContainer: {
    backgroundColor: '#333', // Dark background color for the search bar
    borderRadius: 10, // Rounded borders for the search bar
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    color: '#fff', // White text color for the search input
  },
});


export default ListParking;