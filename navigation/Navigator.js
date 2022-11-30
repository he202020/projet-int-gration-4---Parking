import {StyleSheet} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import ParkingScreen from "./screens/ParkingScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Map from "./screens/Map"

const Tab = createBottomTabNavigator();

export default function Navigator() {

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'Accueil') {
                        iconName = 'home';
                    }
                    else if (route.name === 'Map') {
                        iconName = 'map-marker-alt';
                    }
                    else {
                        iconName = 'parking';
                    }
                    if (focused) {
                        color = '#286ec3';
                        size = 30;
                    }
                    else {
                        color = '#666666';
                        size = 25;
                    }
                    return <FontAwesome5 name={iconName} color={color} size={size} />
                },
                tabBarLabelStyle: {
                    color: '#eedddd',
                    fontWeight: '600'
                },
                tabBarStyle: {
                    height: 60,
                    backgroundColor: '#151515',
                }
            })}
        >
            <Tab.Screen name="Accueil" component={HomeScreen} options={styles} />
            <Tab.Screen name="Liste des parkings" component={ParkingScreen} options={styles} />
            <Tab.Screen name = "Map" component={Map} options={styles} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#151515',
        height: 125
    },
    headerTitleStyle: {
        fontSize: 30,
        color: '#eedddd',
        fontWeight: 'bold'
    }
});