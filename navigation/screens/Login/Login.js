import React, {useState} from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native';
import CustomInput from '../Register/CustomInput';
import CustomButton from '../Register/CustomButton';
import Register from '../Register/Register';
import { useRoute, useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
    const navigation = useNavigation();
   
    const [email, setEmail] = useState("");
    const {password, setPassword} = useState('');
    const {height} = useWindowDimensions();

    const onSignInPressed = () => {
        console.warn("onSignInPressed()");
        console.log("Email",email);
        console.log('mot de passe',password);
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
            <CustomInput 
            placeholder="Email" 
            value={email} 
            setValue={setEmail}/>
            
            {/* PASSWORD */}
            <CustomInput 
            placeholder="Mot de passe" 
            value={password} 
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
    logo:{
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