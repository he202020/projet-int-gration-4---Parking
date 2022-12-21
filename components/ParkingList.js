import React, { Fragment, useEffect, useState } from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import ParkingDetails from "./ParkingDetails";
import {FontAwesome5} from "@expo/vector-icons";
import * as Location from 'expo-location';

let parkingInfo = {};

export default function ParkingList() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [items, setItems] = useState([]);
    let location = null;

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            Location.getCurrentPositionAsync({})
                .then(res => postDistance(res))
                .then(res => {
                    location = res;
                    console.log(location);
                    getParking();
                });
        })();
    }, []);

    const getParking = async () => {
        try {
            const response = await fetch('https://20a2-2a02-a03f-c0b2-5a00-dd19-c7f0-4f7b-6caf.eu.ngrok.io/parking');

            const json = await response.json();

            for (let x of location) {
                json.find((o, i) => {
                    if (o.parking_id === x.parking_id) {
                        json[i].distance = x.distance / 1000;
                        return true;
                    }
                });
            }
            json.sort((a, b) => {
                return a.distance - b.distance;
            });
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }
    const postDistance = async (location) => {
        try {
            const response = await fetch(
                'https://20a2-2a02-a03f-c0b2-5a00-dd19-c7f0-4f7b-6caf.eu.ngrok.io/geolocation',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({latitude: location.coords.latitude, longitude: location.coords.longitude})
                });
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    const searchName = (input) => {

        if (input){
            let searchData = data.filter((item)=>{
                return item.parking_name.toLowerCase().includes(input.toLowerCase())
            });
            setData(searchData)
        }
        else{
            getParking()
        }
    };

    const getParkingInfo = (data) => {
        parkingInfo = data;
        parkingInfo.parking_opening_hour = parkingInfo.parking_opening_hour.slice(0, 2) + 'h' + parkingInfo.parking_opening_hour.slice(3, 5);
        parkingInfo.parking_closure_hour = parkingInfo.parking_closure_hour.slice(0, 2) + 'h' + parkingInfo.parking_closure_hour.slice(3, 5);
        setVisible(true);
    }

    return (
        <Fragment>
          <View>
                <TextInput style={styles.search}
                           placeholder= "Search Name"
                           onChangeText= {(input)=> {
                               searchName(input);
                           }}
                />
          </View>
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
                                        Distance: {item.distance}
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
        </Fragment>
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
    },
    search: {
        textAlign: 'center',
        fontWeight: '800',
        color: '#eedddd',
        backgroundColor : 'lightblue',
        padding: 12


    }

});