import { text } from "express";
import React from "react";
import {View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({ onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#3871f3',
        width: '70%',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
})

export default CustomButton