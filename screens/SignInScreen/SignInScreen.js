import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import CustomInput from '../CustomInput';
//import Logo from 'C:\github\projet-integration-4-Parking\assets\ParkNRide.png';
//<Image source={Logo} style={[styles.logo, {height: height * 0.3}]} />


const SignInScreen = () => {
    const {height} = useWindowDimensions();
    return (
        <View style={styles.root}>
            
            <Text>Login</Text>
            <CustomInput />
        </View>
    );
};

const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        padding: 20,
        textAlign: 'center',
    },
    logo: {
        width: '70%',
        maxWidth: 100,
        maxHeight: 100,
    }
});

export default SignInScreen;