import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
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
    await AsyncStorage.setItem("USER_NAME", result.data.user.stringify);
    if (result && result.error) {
      alert("Un problème de login");
    }
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
    marginTop: 50,
    marginBottom:30,
  },
  root: {
    alignItems: "center",
    padding: 40,
    paddingBottom: 250,
    paddingTop: 60,
    textAlign: "center",
    backgroundColor: "black",
    
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
    margin: 10,
    marginBottom:-20,
  },

});

export default SignInScreen;
