import React, { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native'


export default function ParkingList() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);


    const getParkings = async () => {
        try {
            const response = await fetch('https://fa18-2a02-a03f-635e-3f00-fd48-c9fa-3091-3787.eu.ngrok.io/parking');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getParkings();
    }, []);

    const handlePress = () => false


    return (

        <View style={styles.buttonList}>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={data}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <Fragment>

                            <Pressable style={styles.button} >
                                <Text style={styles.text}>
                                    Parking {item.parking_name}{'\n\n'}
                                    Ouvert de {item.parking_opening_hour} à {item.parking_closure_hour}{'\n\n'}
                                    Adresse : {item.parking_adress}{'\n\n'}
                                    {item.parking_maximum_place} places max

                                </Text>
                                <Button
                                    onPress = {handlePress}
                                    title = "Aller au parking"
                                    color = "green"
                                />

                            </Pressable>

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
        textAlign: 'center',
        fontWeight: '800',
        color: '#eedddd',
    }
});