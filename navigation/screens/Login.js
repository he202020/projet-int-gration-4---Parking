import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import CustomInput from "./Register/CustomInput";
import CustomButton from "./Register/CustomButton";
import Register from "./Register";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignInScreen = ({navigation,route}) => {
  //const navigation = useNavigation();
  const { onSignUpSuccess, isLoggedIn } = route.params || {};

  const [email, setEmail] = useState("");
  const [ hash, setPassword ]= useState("");
  const [first_name, setfirst_name] = useState("");
  const { height } = useWindowDimensions();

  const onSignInPressed = async () => {
    console.warn("onSignInPressed()");

    try {
      const response = await fetch("https://7e6c-2a02-a03f-635e-3f00-dd57-fda7-f5c0-17c5.ngrok-free.app/person/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, hash: hash }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Erreur de connexion :", errorData.error);
        return;
      }

      const responseData = await response.json();
      const token = responseData.token;
      const userFirstName = responseData.user.first_name;

      // Faire quelque chose avec le jeton, comme le stocker dans le local storage
      // Redirigez ensuite l'utilisateur vers la page appropriée, par exemple, le tableau de bord.
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userName', userFirstName);

      onSignUpSuccess();
    } catch (error) {
      console.error("Erreur :", error);
    }
    navigation.navigate('HomeScreen');
  };

  const onForgotPasswordPressed = () => {
    console.warn("onForgotPasswordPressed()");
  };
  const onSignUpPressed = (Register) => {
    console.warn("onSignUpPressed()");
    navigation.navigate("Register", { Register });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Connexion</Text>

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

      {/* FORGOT PASSWORD BUTTON */}
      <CustomButton
        text="Mot de passe oublié?"
        onPress={onForgotPasswordPressed}
        type="TERTIARY"
      />

      {/* CREATE AN ACCOUNT */}
      <CustomButton
        text="Pas encore de compte ?"
        onPress={onSignUpPressed}
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
    paddingBottom: 600,
    paddingTop: 30,
    textAlign: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
    margin: 15,
  },
});

export default SignInScreen;
