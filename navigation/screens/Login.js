import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  ScrollView,
  Video,
} from "react-native";
import CustomInput from "./Register/CustomInput";
import CustomButton from "./Register/CustomButton";
import Register from "./Register";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../security/AuthContext";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/logo3.png";
import Clickvideo from "../../assets/Clickvideo.png";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [hash, setPassword] = useState("");
  const { onLogin } = useAuth();
  

  const onSignInPressed = async () => {

    const result = await onLogin(email, hash);

    if (result && result.error) {
      alert("Un problème de login");
    }
  };

  

  const onSignUpPressed = (Register) => {
    //console.warn("onForgotPasswordPressed()");
    navigation.navigate("Inscription");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.root}>
        <Image source={Clickvideo} style={styles.logo} />

        {/* email */}
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />

        {/* PASSWORD */}
        <CustomInput
          placeholder="Mot de passe"
          value={hash}
          setValue={setPassword}
          secureTextEntry={true}
        />

        {/* Sign In button */}
        <CustomButton
          text="S'identifier"
          onPress={onSignInPressed}
          type="PRIMARY"
        />



        {/* CREATE AN ACCOUNT */}
        <CustomButton
          text="Pas encore de compte ?"
          onPress={onSignUpPressed}
          type="SECONDARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 50,
    marginBottom: 30,
  },
  root: {
    alignItems: "center",
    padding: 40,
    paddingBottom: 290,
    paddingTop: 70,
    textAlign: "center",
    backgroundColor: "black",
  },
  scrollContainer: {
    flexGrow: 1, // This allows the content to grow and enable scrolling
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
    margin: 10,
    marginBottom: -20,
  },
});

export default SignInScreen;
