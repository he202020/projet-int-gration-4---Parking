import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from "../CustomInput";

const SignInScreen = () => {
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
    },
});

export default SignInScreen;