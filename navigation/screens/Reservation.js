import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";

import axios from "axios";

const ReservationForm = ({route}) => {
  //const {id} = route.params;
  const [numberplateStr, setnumberplateStr] = useState("");
  const [parkingId, setParkingId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  


  const handleReservation = async () => {

    try {
      
      const response = await axios.post(
        "https://d5a6-2a02-a03f-635e-3f00-b054-51dd-b92b-cfd.ngrok-free.app/reservation",
        {
          numberplateStr: numberplateStr,
          parking_id: parkingId,
          day: date,
          start_time: startTime,
          end_time: endTime,
        }
      );

      // Handle the success case (status code 201) here if needed
      setSnackbarMessage(response.data);
      setSnackbarVisible(true);
    } catch (error) {
      // Handle the error case (status code 400) here if needed
      setSnackbarMessage(error.message);
      setSnackbarVisible(true);
    }
  };

  const formatTimeInput = (input) => {
    if (input.length === 3) {
      return input.slice(0, 2) + ":" + input.slice(2);
    } else if (input.length === 6) {
      return input.slice(0, 5) + ":" + input.slice(5);
    } else if (input.length > 8) {
      return input.slice(0, 8);
    } else {
      return input;
    }
  };

  // Custom function to format the date input with "-"
  const formatDateInput = (input) => {
    if (input.length === 3) {
      return input.slice(0, 2) + "-" + input.slice(2);
    } else if (input.length === 6) {
      return input.slice(0, 5) + "-" + input.slice(5);
    } else if (input.length > 10) {
      return input.slice(0, 10);
    } else {
      return input;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Réserve ta place de parking</Text>
        <TextInput
          label="Numberplate ID"
          value={numberplateStr}
          onChangeText={(text) => setnumberplateStr(text)}
          style={styles.input}
        />
        <TextInput
          label="Parking ID"
          value={parkingId}
          onChangeText={(text) => setParkingId(text)}
          style={styles.input}
        />
        <TextInput
          label="Date de réservation"
          value={formatDateInput(date)}
          onChangeText={(text) => setDate(text)}
          style={styles.input}
          keyboardType="numeric" // Numeric keypad for date input
          placeholder="JJ-MM-AAAA" // Example: 07-08-2023
        />
        <TextInput
          label="Heure de début"
          value={formatTimeInput(startTime)}
          onChangeText={(text) => setStartTime(text)}
          style={styles.input}
          keyboardType="numeric" // Numeric keypad for time input
          placeholder="HH:mm:ss" // Example: 14:30
        />
        <TextInput
          label="Heure de fin"
          value={formatTimeInput(endTime)}
          onChangeText={(text) => setEndTime(text)}
          style={styles.input}
          keyboardType="numeric" // Numeric keypad for time input
          placeholder="HH:mm:ss" // Example: 17:45
        />
        <Button
          mode="contained"
          onPress={handleReservation}
          style={styles.reservationButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Réserver
        </Button>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center", // Center the content horizontally
    justifyContent: "center", // Center the content vertically
  },
  formContainer: {
    width: "80%", // Set the desired width of the form container
    marginTop: -95, // Adjust the negative marginTop value to move the form higher
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },

  reservationButton: {
    backgroundColor: "orange",
    marginTop: 20,
  },
  buttonContent: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  buttonLabel: {
    color: "white",
    fontSize: 18,
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 7,
    backgroundColor: "white",
    color: "white",
    paddingHorizontal: 15,
    marginBottom: 10,
    color: "black", // Change the text color to black for better visibility
  },
});

export default ReservationForm;
