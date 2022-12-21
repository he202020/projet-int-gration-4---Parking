import React, { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function AvailablePlace() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getAvailablePlace = async () => {
        try {
            const response = await fetch('https://03e3-193-190-65-64.eu.ngrok.io/AvailablePlace');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAvailablePlace();
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
                                    {item.place}
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
        backgroundColor: '#777777',
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
        color: '#aadddd',
    }
});