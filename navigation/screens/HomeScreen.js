import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen({ route }) {
  const { userName, parkingName, reservationDuration } = route.params || {};

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Bonjour, {userName}!</Text>
      <Text style={styles.subHeader}>Click 'n' Park!</Text>
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
});

