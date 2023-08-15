import {useAuth} from "../security/AuthContext";
import HomeScreen from "./screens/HomeScreen";
import {Button} from "react-native-paper";
import ListParking from "./screens/ListParking";
import GoogleMap from "./screens/GoogleMap";
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome5} from "@expo/vector-icons";
import {StyleSheet} from "react-native";
const Tab = createBottomTabNavigator();

export function AppScreens() {
  const {onLogout} = useAuth();

  return (
      <Tab.Navigator screenOptions={tabScreenOptions}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
          headerRight: () => (
              <Button style={styles.logout} onPress={onLogout} title="Sign out"> Déconnexion </Button>
          )
        }}/>
        <Tab.Screen name="ListParking" component={ListParking} options={{
          headerRight: () => (
              <Button style={styles.logout} onPress={onLogout} title="Sign out"> Déconnexion </Button>
          )
        }}/>
        <Tab.Screen name="GoogleMap" component={GoogleMap} options={{
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
      case "HomeScreen":
        iconName = "home";
        break;
      case "GoogleMap":
        iconName = "map";
        break;
      case "ListParking":
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

const renderTabBarIcon = (iconName, focused, color, size) => {
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
  }
})