import React, { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ParkingList() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getParkings = async () => {
        try {
            const response = await fetch('https://bdc8-2a02-a03f-636c-fd00-c000-643d-96b1-8418.eu.ngrok.io/parking');
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
                    numColumns={2}
                    renderItem={({ item }) => (
                        <Fragment>
                            <Pressable style={styles.button}>
                                <Text style={styles.text}>
                                    Parking {item.name}{'\n'}
                                    {item.owner}
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
        backgroundColor: '#151515',
        paddingLeft: 15,
        paddingRight: 15,
    },
    text: {
        textAlign: 'center',
        fontWeight: '800',
        color: '#1ccc5b',
    }
});