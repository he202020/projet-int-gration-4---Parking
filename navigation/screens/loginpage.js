import {StatusBar} from "expo-status-bar";
import React from "react";
import { StyleSheet, Text,View,Button} from "react-native";

export default class SignUp extends React.Component{
    state = {
        data : {"parking_name": "Loading. . ."}
    }

    getJsonData = () => {
        fetch("https://5545-2a02-a03f-c0b4-e600-34b6-b0f0-508d-a3e6.eu.ngrok.io/parking",
            {method:'GET'}).then((response) => response.json())
            .then((responseJson) => {
                console.log(reponseJson);
                this.setState({
                    data: responseJson
                })

            })
            .catch((error) =>{
                console.error(error)

            })
    }
    componentDidMount = () => {
        this.getJsonData()
    }

    render() {
        return(
            <View>
                <Text style ={{margin:10, fontsize:16}}>{'parking_id' + this.state.data['parking_id']}</Text>
            </View>
        )
    }
}