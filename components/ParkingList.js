import React, { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import ParkingDetails from "./ParkingDetails";

export default function ParkingList() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);

    const getParking = async () => {
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
        getParking();
    }, []);

    return (
        <View style={styles.buttonList}>
            <ParkingDetails visible={visible}>
                <View>
                    <Text style={styles.text.head}>Détails</Text>
                </View>
            </ParkingDetails>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={data}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <Fragment>
                            <Pressable style={styles.button} onPress={() => setVisible(true)}>
                                <Text style={styles.text.head}>
                                    Parking {item.parking_name}
                                </Text>
                                <Text style={styles.text.body}>
                                    {item.parking_adress}{'\n'}
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
        head: {
            fontWeight: '800',
            color: '#eedddd'
        },
        body: {
            fontWeight: '600',
            color: '#bbaaaa'
        }
    }
});