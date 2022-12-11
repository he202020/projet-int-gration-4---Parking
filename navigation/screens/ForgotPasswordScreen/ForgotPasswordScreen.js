import React, {useState} from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton/CustomButton';

const ForgotPasswordScreen = () => {
    const {username, setUsername} = useState('');
    const {code, setCode} = useState('');
    const {height} = useWindowDimensions();

    const onSendCodePressed = () => {
        console.warn("onForgotPasswordPressed()");
    };
    const onVerificationPressed = () => {
        console.warn("onVerificationPressed()");
    };

    return (
        <View style={styles.root}>

            {/* LOGO */}
            <Image
                source={require('../../../assets/ParkNRide.png')}
                style={[styles.logo, {height: height * 0.3}]}
                resizeMode="contain"
            />
            
            {/* USERNAME */}
            <CustomInput 
            placeholder="Username" 
            value={username} 
            setValue={setUsername}/>
            
            {/* SEND CODE BUTTON */}
            <CustomButton 
            text="Envoyer le code" 
            onPress={onSendCodePressed}
            type="PRIMARY"
            />
                        
            {/* CODE */}
            <CustomInput 
            placeholder="Code de vérification" 
            value={code} 
            setValue={setCode}/>

            {/* VERIFICATION BUTTON */}
            <CustomButton 
            text="Vérifier" 
            onPress={onVerificationPressed}
            type="PRIMARY"
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

export default ForgotPasswordScreen;