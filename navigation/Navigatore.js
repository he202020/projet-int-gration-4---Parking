import {useAuth} from "../security/AuthContext";
import HomeScreen from "./screens/HomeScreen";
import {Button} from "react-native-paper";
import ListParking from "./screens/ListParking";
import GoogleMap from "./screens/GoogleMap";
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome5} from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export function AppScreens() {
  return (
      <Tab.Navigator screenOptions={tabScreenOptions}>
        <Tab.Screen name="HomeScreen" component={HomeScreen}/>
        <Tab.Screen name="ListParking" component={ListParking}/>
        <Tab.Screen name="GoogleMap" component={GoogleMap}/>
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