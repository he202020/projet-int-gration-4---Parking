import React, {useState} from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton/CustomButton';
//<Image source={Logo} style={[styles.logo, {height: height * 0.3}]} />


const SignInScreen = () => {
    const {username, setUsername} = useState('');
    const {password, setPassword} = useState('');
    const {height} = useWindowDimensions();

    const onSignInPressed = () => {
        console.warn("Sign in");
    };

    return (
        <View style={styles.root}>

            <Image
                source={require('../../../assets/ParkNRide.png')}
                style={[styles.logo, {height: height * 0.3}]}
                resizeMode="contain"
            />

            <Text style={styles.title}>Identifie toi !</Text>
            <Text> </Text>

            <CustomInput placeholder="Username" value={username} setValue={setUsername}/>
            <CustomInput 
            placeholder="Password" 
            value={password} 
            setValue={setPassword}
            secureTextEntry={true}
            />

            <CustomButton text="S'identifier" onPress={onSignInPressed}/>
            
            <Text> </Text>
            <Text style={styles.title}>Pas encore de compte?</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        padding: 20,
        textAlign: 'center',
    },
    title:{
        color: 'white',
    }
});

export default SignInScreen;