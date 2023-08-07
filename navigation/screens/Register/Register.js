import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,Alert } from "react-native";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import { useRoute, useNavigation } from "@react-navigation/native";
import Navigatore from "../../Navigatore";

const SignUpScreen = ({ navigation, route }) => {
  const { onSignUpSuccess, isLoggedIn } = route.params || {};
  // const navigation = useNavigation();
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [company, setcompany] = useState("");
  const [password, setpassword] = useState("");
  const [gdprAccepted, setGdprAccepted] = useState(false); // State for the checkbox

  //SignUp button pressed
  const onSignUpPressed = () => {
    console.warn("onSignUpPressed()");
    if (first_name === '' || last_name === '' || email === '') {
        Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
        return;
      }
    if (gdprAccepted) {
      // Perform signup logic
      console.log("Prénom :", first_name);
      console.log("Nom:", last_name);
      console.log("Email:", email);
      
      console.log("société:", company);
      console.log("Mot de passe:", password);

      onSignUpSuccess();
    } else {
      console.log("Vous n'avez pas rempli tous les champs");
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
        value={first_name}
        setValue={setfirst_name}
      />
      <CustomInput
        placeholder="* Nom"
        value={last_name}
        setValue={setlast_name}
      />
      <CustomInput
        placeholder="* Adresse mail"
        value={email}
        setValue={setEmail}
      />

      <CustomInput
        placeholder="* Société"
        value={company}
        setValue={setcompany}
      />
      {/* <Text style={styles.comment}>Optionnel</Text> */}
      <CustomInput
        placeholder="* Mot de passe"
        secureTextEntry={true}
        inputStyle={styles.input}
        value={password}
        setValue={setpassword}
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
    alignItems: "center",
    padding: 40,
    paddingBottom: 145,
    paddingTop: 40,
    textAlign: "center",
    backgroundColor: "black",
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
