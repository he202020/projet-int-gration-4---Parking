import {StatusBar} from "expo-status-bar";
import React from "react";
import { Text,View} from "react-native";
import {useEffect, useState} from "@types/react";
import React, { Fragment, useEffect, useState } from 'react';

export default function SignUp() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);

    const getParking = async () => {
        try {
            const response = await fetch('https://5545-2a02-a03f-c0b4-e600-34b6-b0f0-508d-a3e6.eu.ngrok.io/parking');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
    getParking();
}, []);

        return(
            <View>
                <Text style ={{margin:10, fontsize:16}}>{'parking_name' + this.state.data['parking_name']}</Text>
            </View>
        )

}