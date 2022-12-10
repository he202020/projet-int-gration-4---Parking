import React from "react";
import {View, Text, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({ onPress, text, type = "PRIMARY" }) => {
    return (
        <Pressable 
        onPress={onPress} 
        style={[
            styles.container, 
            styles[`container_${type}`]
            ]}>
            <Text 
            style={[
                styles.text, 
                styles[`text_${type}`]
                ]}>
                    {text}
                </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container:{
        width: '70%',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    container_PRIMARY:{
        backgroundColor: '#3871f3',
    },
    container_TERTIARY: {
        
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
    text_TERTIARY: {
        color: '#808080',
    },
})

export default CustomButton