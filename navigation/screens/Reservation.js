import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";



const ReservationForm = () => {
  const [data, setData] = useState(data); // Add this line to define and initialize the 'data' state
  const [numberplate, setnumberplate] = useState("");
  const [time, settime] = useState("");

  const addReservation = (numberplate, time) => {
    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const newReservation = {
      id: newId,
      numberplate,
      parking_id: 5, // You can assign an appropriate value here if you have parking information
      time,
    };
    setData([...data, newReservation]); // Update the state with the new reservation
  };

  const handleSubmit = () => {
    if (numberplate === "" || time === "") {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    // Appeler l'API backend pour enregistrer la réservation
    // Ici, vous pouvez utiliser la fonction fetch() pour envoyer les données au backend
    // Assurez-vous que l'API backend est correctement configurée pour gérer les réservations.

    // Remplacer "http://votre-serveur-backend.com/reservations" par l'URL de votre API backend
    fetch("https://f603-2a02-a03f-635e-3f00-7459-6490-afad-74ea.ngrok-free.app/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        numberplate,
        time,
      }),
    })
      .then((response) => response.json())
      /*.then((data) => {
        addReservation(numberplate, time); // Pass numberplate and time to addReservation function
        // Si la réservation est réussie, vous pouvez afficher un message de succès.
        Alert.alert("Succès", "Réservation réussie !");
        // Réinitialiser les champs du formulaire après la réservation réussie.
        setnumberplate("");
        settime("");
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer plus tard.");
      });*/
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Plaque d'immatriculation"
        value={numberplate}
        onChangeText={(text) => setnumberplate(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Durée"
        value={time}
        onChangeText={(text) => settime(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Réserver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#ff6600", // Orange button background color
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
});

export default ReservationForm;
