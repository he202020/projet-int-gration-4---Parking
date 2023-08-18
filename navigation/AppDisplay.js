import {useAuth} from "../security/AuthContext";
import {NavigationContainer} from "@react-navigation/native";
import {AppScreens} from "./Navigatore";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Reservation from "./screens/Reservation";

const Stack = createStackNavigator();

export const AppDisplay = () => {
    const { authState, onLogout } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {authState?.authenticated ? (
                    <>
                        <Stack.Screen name={"Click 'n' Park"} component={AppScreens} options={{
                            headerShown: false
                        }}/>
                        <Stack.Screen name={"Reservation"} component={Reservation}></Stack.Screen>
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register}/>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
