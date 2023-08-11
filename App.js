import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  const ReservationButton = ({ navigation }) => (
      <TouchableOpacity onPress={() => navigation.navigate("Reservation")}>
        <Text style={{ color: "#fff", marginRight: 10 }}>Go to Reservation</Text>
      </TouchableOpacity>
  );

  return (
      <NavigationContainer>
        {isLoggedIn ? (
            <Stack.Navigator>
              <Stack.Screen
                  name="HomeTabs"
                  component={() => (
                      <Tab.Navigator screenOptions={tabScreenOptions}>
                        <Tab.Screen name="HomeScreen" component={HomeScreen} />
                        <Tab.Screen name="ListParking" component={ListParking} />
                        <Tab.Screen name="GoogleMap" component={GoogleMap} />
                      </Tab.Navigator>
                  )}
                  options={({ navigation }) => ({
                    title: "My App",
                    headerRight: () => <ReservationButton navigation={navigation} />,
                  })}
              />
              <Stack.Screen name="Reservation" component={Reservation} />
            </Stack.Navigator>
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