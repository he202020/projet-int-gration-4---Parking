import React from "react";
import {View, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder} 
            style={styles.input}
            secureTextEntry={secureTextEntry} //doesn't display password while typing
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '95%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 15,
        marginVertical: 5,
    },
    input: {
        paddingTop: 10,
        paddingBottom: 12,
        borderStyle: 'solid',
        width: '50%',
    },
});

export default CustomInput