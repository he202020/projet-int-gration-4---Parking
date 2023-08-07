import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen({ route }) {
  const { userName } = route.params || {};

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Bienvenue: {userName}</Text>
      <Text style={styles.text}>Click ' n ' Park ! </Text>
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
  text: {
    color: "#eedddd",
    fontWeight: "800",
  },
});
