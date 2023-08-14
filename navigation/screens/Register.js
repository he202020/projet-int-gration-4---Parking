import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CustomInput from "./Register/CustomInput";
import CustomButton from "./Register/CustomButton";
import { useRoute, useNavigation } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import axios from "axios";
import {useAuth} from "../../security/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import Axios


const SignUpScreen = ({ navigation, route }) => {
  const { onSignUpSuccess, isLoggedIn } = route.params || {};
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [hash, setPassword] = useState("");
  const [plate, setPlate] = useState("");
  const [gdprAccepted, setGdprAccepted] = useState(false); // State for the checkbox
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin(email, hash);
    await AsyncStorage.setItem('USER_NAME', result.data.user.stringify)
    if (result && result.error) {
      alert("Un problème de login");
    }
  };

  //SignUp button pressed
  const onSignUpPressed = async () => {
    const result = await onRegister(email, hash, firstName, lastName, company, plate);
    if (result && result.error) {
      alert("Un problème de login");
    } else {
      login();
    }
  };

  // Handle checkbox state change
  const toggleGdprCheckbox = () => {
    setGdprAccepted((prev) => !prev);
  };

  const handleLogin = (Login) => {
    navigation.navigate("Login");
  };
  //Hyperlinks
  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed()");
  };
  const onPrivacyPressed = () => {
    console.warn("onPrivacyPressed()");
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Inscription</Text>
      <Text style={styles.comment}>
        Ceci est une demande, elle sera envoyée à un administrateur afin de
        vérifier votre admissibilité{" "}
      </Text>
      <CustomInput
        placeholder="* Prénom"
        value={firstName}
        setValue={setFirstName}
      />
      <CustomInput
        placeholder="* Nom"
        value={lastName}
        setValue={setLastName}
      />
      <CustomInput
        placeholder="* Adresse mail"
        value={email}
        setValue={setEmail}
      />

      <CustomInput
        placeholder="* Société"
        value={company}
        setValue={setCompany}
      />
      {/* <Text style={styles.comment}>Optionnel</Text> */}
      <CustomInput
        placeholder="* Mot de passe"
        secureTextEntry={true}
        inputStyle={styles.input}
        value={hash}
        setValue={setPassword}
      />
      <CustomInput
        placeholder="* Plaque d'immatriculation"
        inputStyle={styles.input}
        value={plate}
        setValue={setPlate}
      />
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={toggleGdprCheckbox}
      >
        <View style={styles.checkbox}>
          {gdprAccepted ? <View style={styles.checkboxInner} /> : null}
        </View>
        <Text style={styles.checkboxLabel}>
          En créant un compte, vous acceptez les{" "}
          <Text style={styles.hyperlink} onPress={onTermsOfUsePressed}>
            Termes et Conditions d'utilisation{" "}
          </Text>
          ainsi que la{" "}
          <Text style={styles.hyperlink} onPress={onPrivacyPressed}>
            Politique de Confidentialité{" "}
          </Text>
          de l'entreprise
        </Text>
      </TouchableOpacity>
      <CustomButton
        text="S'inscrire"
        onPress={onSignUpPressed}
        type="PRIMARY"
      />

      <CustomButton
        style={styles.already}
        text="Déjà un compte ?"
        onPress={handleLogin}
        type="SECONDARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 15,
    height: 300,
    width: 300,
    maxHeight: 300,
    maxWidth: 300,
  },
  root: {
    padding: 40,
    paddingBottom: 180,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#171717",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
    margin: 10,
  },
  comment: {
    marginTop: 10,
    marginBottom: 20,
    // marginBottom: 20,
    width: "90%",
    textAlign: "center",
    color: "white",
  },
  RGPD: {
    marginTop: 20,
    fontStyle: "italic",
    textAlign: "justify",
    color: "grey",
    fontSize: 12,
    marginBottom: 20,
  },
  hyperlink: {
    marginTop: 20,
    color: "#0096FF",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "grey",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "#0096FF", // Color when the checkbox is checked
  },
  checkboxLabel: {
    color: "white",
    flex: 1,
  },
  already: {
    color: "#fff",
    flex: 1,
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 15,
  },
});

export default SignUpScreen;
