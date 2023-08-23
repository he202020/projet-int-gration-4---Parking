import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ngrok from "./ngrok";

const ListParking = () => {
  const navigation = useNavigation();
  const [parkingData, setParkingData] = useState([]);
  const [selectedParking, setSelectedParking] = useState(null);
  const [searchInput, setSearchInput] = useState("")


  const fetchParkingData = async () => {
    try {
      const response = await fetch(
        "https://2295-2a02-a03f-c09c-b00-8149-d6c1-f0a3-7361.ngrok-free.app/parking"
      );
      const data = await response.json();
      setParkingData(data);
    } catch (error) {
      console.error("Error fetching parking data:", error);
    }
  };

  useEffect(() => {
    fetchParkingData();
  }, []);



  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        Parking: {item.name} {"\n\n"}
        {item.nbr_free_spaces} places libres {"\n\n"} 
        Adresse : {item.address}  {"\n\n"}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => GoParking(item)}>
        <Text style={styles.buttonText}>Aller au parking</Text>
      </TouchableOpacity>
    </View>
  );

  const searchName = (input) => {
    const searchData = parkingData.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setParkingData(searchData);
  };

  const GoParking = (parking) => {
    setSelectedParking(parking);
    navigation.navigate("Map", { 
      selectedParking: parking,  
      selectedParkingId: parking.id, 
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      setSearchInput(""); // Reset search input
      fetchParkingData(); // Fetch parking data when screen gains focus
    }, []));

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
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a", // Dark background color
    padding: 16,
  },
  itemContainer: {
    backgroundColor: "#333", // Dark background color for each item
    borderRadius: 10, // Rounded borders
    padding: 16,
    marginBottom: 12,
  },
  itemText: {
    color: "#fff", // White text color
    fontSize: 16,
  },
  button: {
    backgroundColor: "orange", // Orange button background color
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff", // White text color for the button
    fontSize: 16,
    textAlign: "center",
  },
  searchContainer: {
    backgroundColor: "#333", // Dark background color for the search bar
    borderRadius: 10, // Rounded borders for the search bar
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    color: "#fff", // White text color for the search input
  },
});

export default ListParking;
