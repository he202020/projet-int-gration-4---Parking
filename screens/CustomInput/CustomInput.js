import React from "react";
import {View, Text, TextInput, StyleSheet } from 'react-native';
import { shouldUseActivityState } from "react-native-screens";

const CustomInput = () => {
    return (
        <View style={styles.container}>
            <TextInput placeholder="Username" style={styles.input}/>
            <TextInput placeholder="Password" style={styles.input}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: '10%',
        paddingRight: '10%',
        borderstyle: 'solid',

    },
    input: {
        paddingTop: 10,
        borderstyle: 'solid',
        paddingBottom: 10,
        textAlign: "center",
        width: '50%',
        backgroundColor: '#D3D3D3',
    },
});

export default CustomInput