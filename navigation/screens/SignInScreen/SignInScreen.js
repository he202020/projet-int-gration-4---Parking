import React, {useState} from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton/CustomButton';

const SignInScreen = () => {
    const {username, setUsername} = useState('');
    const {password, setPassword} = useState('');
    const {height} = useWindowDimensions();

    const onSignInPressed = () => {
        console.warn("onSignInPressed()");
    };
    const onForgotPasswordPressed = () => {
        console.warn("onForgotPasswordPressed()");
    };
    const onSignUpPressed = () => {
        console.warn("onSignUpPressed()");
    };

    return (
        <View style={styles.root}>

            <Image
                source={require('../../../assets/ParkNRide.png')}
                style={[styles.logo, {height: height * 0.3}]}
                resizeMode="contain"
            />

            <CustomInput placeholder="Username" value={username} setValue={setUsername}/>
            
            <CustomInput 
            placeholder="Password" 
            value={password} 
            setValue={setPassword}
            secureTextEntry={true}
            />

            <CustomButton 
            text="S'identifier" 
            onPress={onSignInPressed}
            type="PRIMARY"
            />

            <CustomButton 
            text="Mot de passe oublié??" 
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
            />

            <CustomButton 
            text="Pas encore de compte?" 
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
    root:{
        alignItems: 'center',
        padding: 20,
        textAlign: 'center',
    },
    title:{
        color: 'white',
        textDecorationLine: 'underline',
        fontStyle: 'italic',
        padding: 20,
    }
});

export default SignInScreen;