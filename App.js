import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";
//import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "./navigation/screens/HomeScreen";
import ListParking from "./navigation/screens/ListParking";
import Login from "./navigation/screens/Login/Login";
import Reservation from "./navigation/screens/Reservation";
import Register from "./navigation/screens/Register/Register";
import GoogleMap from "./navigation/screens/GoogleMap";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const onSignUpSuccess = () => {
    setIsLoggedIn(true);
  };

  const renderTabBarIcon = (iconName, focused, color, size) => {
    return (
      <FontAwesome5
        name={iconName}
        color={focused ? "#1ccc5b" : "#eedddd"}
        size={focused ? 30 : 25}
      />
    );
  };

  const tabScreenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      switch (route.name) {
        case "Accueil":
          iconName = "home";
          break;
        case "GoogleMap":
          iconName = "map"; // Utilisation de l'icône "map" (carte)
          break;
        case "ListParking":
          iconName = "parking"; // Vous pouvez également utiliser "local-parking" pour une icône de parking dans MaterialIcons
          break;
        case "Reservation":
          iconName = "car";
          break;
        case "Login":
          iconName = "login";
          break;
        case "Register":
          iconName = "login";
          break;
        default:
          iconName = "question"; // Utiliser une icône par défaut en cas de route inconnue
      }

      return renderTabBarIcon(iconName, focused, color, size);
    },
    tabBarShowLabel: false,
    tabBarStyle: {
      height: 60,
      backgroundColor: "#151515",
    },
  });

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator screenOptions={tabScreenOptions}>
          <Tab.Screen name="Accueil" component={HomeScreen} />
          <Tab.Screen name="ListParking" component={ListParking} />
          <Tab.Screen name="GoogleMap" component={GoogleMap} />
          <Tab.Screen name="Reservation" component={Reservation} />
          
          
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={tabScreenOptions}>
          <Stack.Screen
            name="Register"
            component={Register}
            initialParams={{ onSignUpSuccess, isLoggedIn }}
          />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
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

export default App;
