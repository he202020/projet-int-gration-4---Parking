import React, { Fragment, useEffect, useState } from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ParkingDetails from "./ParkingDetails";
import {FontAwesome5} from "@expo/vector-icons";

let parkingInfo = {};

export default function ParkingList() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);

    const getParking = async () => {
        try {
            const response = await fetch('https://098d-193-190-65-65.eu.ngrok.io/parking');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const getParkingInfo = (data) => {
        parkingInfo = data;
        parkingInfo.parking_opening_hour = parkingInfo.parking_opening_hour.slice(0, 2) + 'h' + parkingInfo.parking_opening_hour.slice(3, 5);
        parkingInfo.parking_closure_hour = parkingInfo.parking_closure_hour.slice(0, 2) + 'h' + parkingInfo.parking_closure_hour.slice(3, 5);
        setVisible(true);
    }

    useEffect(() => {
        getParking();
    }, []);

    return (
        <View style={styles.buttonList}>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={data}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <Fragment>
                            <TouchableOpacity onPress={() => getParkingInfo(item)}>
                                <View style={styles.button}>
                                    <Text style={styles.text.head}>
                                        Parking {item.parking_name}
                                    </Text>
                                    <Text style={styles.text.body}>
                                        {item.parking_address}{'\n'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <ParkingDetails visible={visible}>
                                <View>
                                    <View style={styles.modalHeader}>
                                        <TouchableOpacity onPress={() => setVisible(false)} style={{alignItems: 'flex-end'}}>
                                            <FontAwesome5 name="times" size={50} color={styles.modalHeader.color} />
                                        </TouchableOpacity>
                                        <Text style={styles.text.head}>Parking {parkingInfo.parking_name}</Text>
                                    </View>
                                    <Text style={styles.text.body}>
                                        {'\n'}{parkingInfo.parking_maximum_place} places max,
                                        {'\n'}ouvert de {parkingInfo.parking_opening_hour} à {parkingInfo.parking_closure_hour}
                                    </Text>
                                </View>
                            </ParkingDetails>
                        </Fragment>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 7,
        padding: 15,
        backgroundColor: '#252528',
        borderRadius: 5,
        flex: 1
    },
    buttonList: {
        backgroundColor: '#171717',
        paddingLeft: 15,
        paddingRight: 15,
    },
    text: {
        head: {
            fontSize: 20,
            fontWeight: '900',
            color: '#eedddd'
        },
        body: {
            fontSize: 15,
            fontWeight: '600',
            color: '#bbaaaa'
        }
    },
    modalHeader: {
        fontWeight: '800',
        color: '#eedddd'
    }
});