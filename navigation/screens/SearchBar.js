import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

const ReservationForm = () => {
  const [PlaqueImmatriculation, setPlaqueImmatriculation] = useState('');
  const [Nom, setNom] = useState('');
  const [Duree, setDuree] = useState('');

  const handleSubmit = () => {
    if (PlaqueImmatriculation === '' || Nom === '' || Duree === '') {
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
        PlaqueImmatriculation,
        Nom,
        Duree,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Si la réservation est réussie, vous pouvez afficher un message de succès.
        Alert.alert('Success', 'Reservation successful!');
        // Réinitialiser les champs du formulaire après la réservation réussie.
        setPlaqueImmatriculation('');
        setNom('');
        setDuree('');
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
        value={PlaqueImmatriculation}
        onChangeText={text => setPlaqueImmatriculation(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={Nom}
        onChangeText={text => setNom(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Durée"
        value={Duree}
        onChangeText={text => setDuree(text)}
        keyboardType="numeric"
      />
      <Button title="Réserver" onPress={handleSubmit} />
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
});

export default ReservationForm;
