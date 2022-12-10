import React from "react";
import {View, Text, TextInput, StyleSheet } from 'react-native';
import { shouldUseActivityState } from "react-native-screens";

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
        width: '70%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,

        // paddingLeft: '10%',
        // paddingRight: '10%',
        // paddingBottom: '5%',
        // paddingTop: '5%',
        // borderstyle: 'solid',
        // borderColor: '#000000', //black
        // marginTop: '20%',
        // marginLeft: '20%',
        // marginRight: '20%',
        //backgroundColor: '#D3D3D3', //grey

    },
    input: {
        paddingTop: 10,
        borderstyle: 'solid',
        paddingBottom: 10,
        //textAlign: "center",
        width: '50%',
    },
});

export default CustomInput