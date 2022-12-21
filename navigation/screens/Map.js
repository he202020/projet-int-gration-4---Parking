import * as React from 'react';
import { Platform, StyleSheet, View,Text} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class App extends React.Component {
    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation initialRegion={{
                latitude: 50.668081,
                longitude: 4.6118324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421}} />

        );
    }
}