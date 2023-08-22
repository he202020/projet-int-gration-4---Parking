import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from "@expo/vector-icons/AntDesign";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
//import { addNumberPlate } from '../../backend/rest-api/services/requests/NumberPlate';

export default function HomeScreen({ route }) {
  const { parkingName, reservationDuration, idperson, numberplate } =
    route.params || {};
  const [userName, setUserName] = useState("");
  const { userName: routeUserName } = route.params || {};

  const [newPlate, setNewPlate] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchUserName() {
        const storedUserName = await AsyncStorage.getItem("USER_NAME");

        setUserName(storedUserName || routeUserName || "");
      }

      fetchUserName();
    }, [routeUserName])
  );

  useEffect(() => {
    if (Array.isArray(numberplate)) {
      const data = numberplate.map((obj) => {
        return {
          label: obj.str,
          value: obj.str
        }
      })
      setItems(data);
    }
  }, [numberplate]);

  const addPlate = async () => {
    try {
      const response = await fetch(
        "https://393f-2a02-a03f-635e-3f00-a8f4-5ba9-aaea-502e.ngrok-free.app/numberPlate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            str: newPlate,
            person_id: parseInt(idperson),
          }),
        }
      );
      console.log(newPlate, idperson);

      if (response.status === 201) {
        console.log("Plaque ajoutée avec succès");
        // Effectuez des actions supplémentaires ici si nécessaire
      } else {
        console.error("Erreur lors de l'ajout de la plaque");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le serveur", error);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Bonjour, {userName}!</Text>
      <Text style={styles.subHeader}>Click 'n' Park!</Text>
      <TextInput
        placeholder="Entrez une nouvelle plaque"
        value={newPlate}
        onChangeText={(text) => setNewPlate(text)}
        style={styles.input}
      />

      <TouchableOpacity onPress={addPlate}>
        <Text style={styles.buttonText}>Ajouter la plaque</Text>
      </TouchableOpacity>
      <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
      />
      {parkingName && (
        <Text style={styles.infoText}>
          Vous avez réservé le parking : {parkingName}
        </Text>
      )}
      {reservationDuration && (
        <Text style={styles.infoText}>
          Durée de réservation : {reservationDuration}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#171717",
  },
  header: {
    color: "#eedddd",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    color: "#ffa500",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  infoText: {
    color: "#eedddd",
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 200,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
