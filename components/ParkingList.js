import React, { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ParkingList() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getParkings = async () => {
        try {
            const response = await fetch('localhost:8080/parking');
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

    return (
        <View style={styles.buttonList}>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={data}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <Fragment>
                            <Pressable style={styles.button}>
                                <Text style={styles.text}>
                                    Parking {item.parking_name}{'\n\n'}
                                    Ouvert de {item.parking_opening_hour} à {item.parking_closure_hour}{'\n\n'}
                                    Adresse : {item.parking_adress}{'\n\n'}
                                    {item.parking_maximum_place} places max
                                </Text>
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