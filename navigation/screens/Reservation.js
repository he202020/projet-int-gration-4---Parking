import React, { useState } from 'react';
import { View,Text, TextInput, Button, Alert, StyleSheet,TouchableOpacity } from 'react-native';

const ReservationForm = () => {
  const [numberplate, setnumberplate] = useState('');
  //const [person_name, setperson_name] = useState('');
  const [time, settime] = useState('');
  

  const handleSubmit = () => {
    if (numberplate === '' || time === '') {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

// Appeler l'API backend pour enregistrer la réservation
    // Ici, vous pouvez utiliser la fonction fetch() pour envoyer les données au backend
    // Assurez-vous que l'API backend est correctement configurée pour gérer les réservations.

    // Remplacer "http://votre-serveur-backend.com/reservations" par l'URL de votre API backend
    fetch('http://votre-serveur-backend.com/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        numberplate,
        time,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Si la réservation est réussie, vous pouvez afficher un message de succès.
        Alert.alert('Success', 'Reservation successful!');
        // Réinitialiser les champs du formulaire après la réservation réussie.
        setnumberplate('');
        
        settime('');
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert("Erreur', 'Une erreur s'est produite. Veuillez réessayer plus tard.");
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Plaque d'immatriculation"
        value={numberplate}
        onChangeText={text => setnumberplate(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Durée"
        value={time}
        onChangeText={text => settime(text)}
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
    backgroundColor: '#f9f9f9',

  },
  input: {

    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#ff6600', // Orange button background color
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
});

export default ReservationForm;
