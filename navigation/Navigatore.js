import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import ParkingScreen from "./screens/ParkingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from "./screens/Map";
import ListParking from "./screens/ListParking";
import Login from "./screens/Login";
import Reservation from "./screens/Reservation";
import Register from "./screens/Register";
import GoogleMap from "./screens/GoogleMap";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigatore = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const onSignUpSuccess = () => {
    setIsLoggedIn(true);
  };

  return isLoggedIn ? (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Accueil") {
            iconName = "home";
          } else if (route.name === "GoogleMap") {
            iconName = "map"; // Utilisation de l'icône "map" (carte)
          } else if (route.name === "ListParking") {
            iconName = "parking"; // Vous pouvez également utiliser "local-parking" pour une icône de parking dans MaterialIcons
          } else if (route.name === "Reservation") {
            iconName = "car";
          } else if (route.name === "Login") {
            iconName = "Login";
          }
          if (focused) {
            color = "#1ccc5b";
            size = 30;
          } else {
            color = "#eedddd";
            size = 25;
          }
          return <FontAwesome5 name={iconName} color={color} size={size} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#151515",
        },
      })}
    >
      <Stack.Screen name="Accueil" component={HomeScreen} options={styles} />
      <Stack.Screen
        name="Reservation"
        component={Reservation}
        options={styles}
      />
      <Stack.Screen
        name="ListParking"
        component={ListParking}
        options={styles}
      />
      <Stack.Screen name="GoogleMap" component={GoogleMap} options={styles} />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator
      
    >
      <Stack.Screen name="Register" component={Register} options={styles} initialParams={{ onSignUpSuccess, isLoggedIn }}/>
      <Stack.Screen name="Login" component={Login} options={styles} />
    </Stack.Navigator>
    
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#151515",
    height: 125,
  },
  headerTitleStyle: {
    color: "#eedddd",
    fontWeight: "bold",
  },
});

export default Navigatore;
