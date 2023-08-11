import React, { useState,useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import moment from "moment"; // Import de Moment.js
import axios from "axios";

const ReservationForm = ({ route }) => {
  //const {id} = route.params;
  const [numberplateStr, setnumberplateStr] = useState("");
  const [parkingId, setParkingId] = useState(null); // Utilisez null pour indiquer que l'ID n'a pas encore été saisi
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedParking, setSelectedParking] = useState(null);

  useEffect(() => {
    if (route.params && route.params.selectedParking) {
      setSelectedParking(route.params.selectedParking);
      setParkingId(route.params.selectedParking.id);
    }
  }, [route.params]);

  function addTwoHoursToTime(originalDate) {
    const newDate = new Date(originalDate);
    newDate.setHours(newDate.getHours() + 2);
    return newDate;
  }

  const handleReservation = async () => {
    try {
      const formattedStartTime = moment(startTime, "HH:mm").toDate();
      const formattedEndTime = moment(endTime, "HH:mm").toDate();

      const response = await axios.post(
        "https://5bec-2a02-a03f-635e-3f00-1d2d-16ff-5c1f-1f9a.ngrok-free.app/reservation",
        {
          numberplateStr: numberplateStr,
          parking_id: parseInt(parkingId), // Convert to integer
          day: new Date(date),
          //start_time: startTime,
          //end_time: endTime,
          start_time: addTwoHoursToTime(formattedStartTime), // Add two heures to start time
          end_time: addTwoHoursToTime(formattedEndTime),
        }
      );
      const duréetotale = moment(formattedEndTime).diff(
        formattedStartTime,
        "minutes"
      );
      const heures = Math.floor(duréetotale / 60);
      const minutes = duréetotale % 60;

      const durationText =
        heures > 0
          ? `${heures} heure(s) et ${minutes} minute(s)`
          : `${minutes} minute(s)`;
      // Handle the success case (status code 201) here if needed
      setSnackbarMessage(
        `Merci d'avoir réservé une place de parking. Vous avez réservé pour une durée de : ${durationText}`
      );
      setSnackbarVisible(true);

      // Clear form fields after successful reservation
      setnumberplateStr("");
      setParkingId("");
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      // Handle the error case (status code 400) here if needed
      setSnackbarMessage(error.message);
      setSnackbarVisible(true);
    }
    console.log(
      handleReservation,
      numberplateStr,
      parkingId,
      date,
      startTime,
      endTime
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Réserve ta place de parking</Text>
        <TextInput
          label="Plaque d'immatriculation"
          value={numberplateStr}
          onChangeText={(text) => setnumberplateStr(text)}
          style={styles.input}
        />
        <TextInput
          label="Parking"
          value={selectedParking ? selectedParking.name : ""}
          onChangeText={(text) => setParkingId(text)}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Date de réservation"
          value={date}
          onChangeText={(text) => setDate(text)}
          style={styles.input}
          placeholder="AAAA-MM-JJ"
        />
        <TextInput
          label="Heure de début"
          value={startTime}
          onChangeText={(text) => setStartTime(text)}
          style={styles.input}
          placeholder="HH:mm"
        />
        <TextInput
          label="Heure de fin"
          value={endTime}
          onChangeText={(text) => setEndTime(text)}
          style={styles.input}
          placeholder="HH:mm"
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
        {typeof snackbarMessage === "object"
          ? snackbarMessage.statusCode
          : snackbarMessage}
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
