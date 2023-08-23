import React, { useState, useEffect } from "react";
import {View,StyleSheet,Text,Alert,ScrollView,TouchableOpacity,} from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import moment from "moment"; // Import de Moment.js
import axios from "axios";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import MaskInput from "react-native-mask-input";
import CalendarPicker from "react-native-calendar-picker";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReservationForm = ({ navigation, route }) => {
  const [numberplateStr, setnumberplateStr] = useState("");
  const [parkingId, setParkingId] = useState(null); // Utilisez null pour indiquer que l'ID n'a pas encore été saisi
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedParking, setSelectedParking] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [remainingTime, setRemainingTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("USER_DATA");

        if (cachedData !== null && fetching === true) {
          setUserData(JSON.parse(cachedData));
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData().then(() => {
      if (userData && fetching === true) {
        const plates = userData.user.numberplate.map((obj) => {
          return {
            label: obj.str,
            value: obj.str,
          };
        });
        setItems(plates);
        setFetching(false);
      }
    });
  });

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
      const id = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
        if (remainingTime <= 0) {
          clearInterval(intervalId);
        }
      }, 1000);

      setIntervalId(id);

      const response = await axios.post(
        "https://4db5-2a02-a03f-c09c-b00-64e2-9c33-1e3c-42fd.ngrok-free.app/reservation",
        {
          numberplateStr: value,
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
      Alert.alert(
        "Réservation réussie",
        `Merci d'avoir réservé une place de parking. Vous avez réservé pour une durée de : ${durationText}`,
        [
          {
            text: "OK",
            onPress: () => {
              // Actions à effectuer lorsque l'utilisateur appuie sur OK
              // Par exemple, retourner à l'écran d'accueil
              navigation.navigate("Acceuil", {
                parkingName: selectedParking ? selectedParking.name : "N/A",
                reservationDuration: durationText,
              });
            },
          },
        ]
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
      value,
      parkingId,
      date,
      startTime,
      endTime
    );

    //navigation.navigate("HomeScreen");
  };
  useEffect(() => {
    if (remainingTime <= 0) {
      clearInterval(intervalId);
    }
  }, [remainingTime, intervalId]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.remainingTime}>
            Remaining Time: {Math.floor(remainingTime / 1000)} seconds
          </Text>
        <Text style={styles.title}>Réserve ta place de parking</Text>
          <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Voici vos plaques"
          />
          <TextInput
            label="Parking"
            value={selectedParking ? selectedParking.name : ""}
            onChangeText={(text) => setParkingId(text)}
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setDatePickerVisible(true)}
          >
            <Text style={styles.datePickerButtonText}>
              {date ? date.format("YYYY-MM-DD") : "Sélectionner une date"}
            </Text>
          </TouchableOpacity>

          {isDatePickerVisible && (
            <CalendarPicker
              onDateChange={(selectedDate) => {
                setDate(selectedDate);
                setDatePickerVisible(false); // Ferme le calendrier après la sélection
              }}
              selectedStartDate={date}
              minDate={new Date()} // Empêche de choisir une date antérieure à la date actuelle
              // Autres propriétés et styles selon vos besoins
              textStyle={styles.calendarText}
              selectedDayStyle={styles.selectedDayStyle}
              selectedDayTextColor="#fff"
              todayBackgroundColor="#FFA500"
              todayTextStyle={styles.todayTextStyle}
            />
          )}

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
    </ScrollView>
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
    width: "90%", // Set the desired width of the form container
    marginTop: -90, // Adjust the negative marginTop value to move the form higher
  
    alignSelf: "flex-start", // Align the form elements to the left
    marginLeft: 20, // Add a small left margin for better alignment
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
  scrollContainer: {
    flexGrow: 1, // This allows the content to grow and enable scrolling
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
    paddingHorizontal: 15,
    marginBottom: 10,
    color: "black", // Change the text color to black for better visibility
    width: "100%", 
    
  },

  calendarText: {
    color: "white", // Texte blanc
    
  },
  selectedDayStyle: {
    backgroundColor: "orange", // Jour sélectionné en orange
  },
  todayTextStyle: {
    color: "white", // Texte des jours actuels en blanc

  },
  datePickerButton: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 7,
    backgroundColor: "white",
    paddingHorizontal: 20,
    marginBottom: 10,
    color: "black", // Change the text color to black for better visibility
    paddingTop:20,
    width: '100%', // Occupe la même largeur que les autres champs
    flexDirection: 'row', // Aligne le texte à gauche
    justifyContent: 'flex-start', // Aligne le texte à gauche
  },
  datePickerButtonText: {
    color: 'black',
    textAlign: 'center',
    paddingBottom:10,
    marginBottom:10,
  },
  plaque: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 7,
    backgroundColor: "white",
    color: "black",
    paddingHorizontal: 15,
    padding: 10,
    marginBottom: 10,
  },
});

export default ReservationForm;
