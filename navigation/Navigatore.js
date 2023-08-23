import {useAuth} from "../security/AuthContext";
import HomeScreen from "./screens/HomeScreen";
import {Button} from "react-native-paper";
import ListParking from "./screens/ListParking";
import GoogleMap from "./screens/GoogleMap";
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome5} from "@expo/vector-icons";
import { StyleSheet } from 'react-native';
const Tab = createBottomTabNavigator();

export function AppScreens() {
  const {onLogout} = useAuth();

  return (
      <Tab.Navigator screenOptions={tabScreenOptions}>
        <Tab.Screen name="Acceuil" component={HomeScreen} options={{
          headerRight: () => (
            <Button style={styles.logout} onPress={onLogout} title="Sign out"> Déconnexion </Button>
          )
        }}/>
        <Tab.Screen name="Parkings" component={ListParking} options={{
          headerRight: () => (
              <Button style={styles.logout} onPress={onLogout} title="Sign out"> Déconnexion </Button>
          )
        }}/>
        <Tab.Screen name="Map" component={GoogleMap} options={{
          headerRight: () => (
              <Button style={styles.logout} onPress={onLogout} title="Sign out"> Déconnexion </Button>
          )
        }}/>
      </Tab.Navigator>
  );
}

const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    switch (route.name) {
      case "Acceuil":
        iconName = "home";
        break;
      case "Map":
        iconName = "map";
        break;
      case "Parkings":
        iconName = "parking";
        break;
      case "Reservation":
        iconName = "car";
        break;
      default:
        iconName = "question";
    }

    return renderTabBarIcon(iconName, focused, color, size);
  },
  tabBarShowLabel: false,
  tabBarStyle: {
    height: 60,
    backgroundColor: "#151515",
  },
});

const renderTabBarIcon = (iconName, focused) => {
  return (
      <FontAwesome5
          name={iconName}
          color={focused ? "#1ccc5b" : "#eedddd"}
          size={focused ? 30 : 25}
      />
  );
};

const styles = StyleSheet.create({
  logout: {
    backgroundColor: "orange",
    color: "white",
  },
  Btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 45,
    height: 45,
    borderRadius: 50,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transitionDuration: 300,
    shadowColor: 'rgba(0, 0, 0, 0.199)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    backgroundColor: 'orange',
  },
  sign: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transitionDuration: 300,
    padding: 20,
  },
  svg: {
    width: 17,
  },
  textContainer: {
    position: 'absolute',
    right: 0,
    opacity: 0,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    transitionDuration: 300,
    paddingRight: 10,
  },
  text: {
    color: 'black',
  },
})