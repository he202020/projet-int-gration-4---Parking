import {useAuth} from "../security/AuthContext";
import {NavigationContainer} from "@react-navigation/native";
import {AppScreens} from "./Navigatore";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { createStackNavigator } from "@react-navigation/stack";
import {Button} from "react-native-paper";
import React from "react";
import {StyleSheet } from "react-native";
const Stack = createStackNavigator();

export const AppDisplay = () => {
    const { authState, onLogout } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {authState?.authenticated ? (
                    <>
                        <Stack.Screen name={"Click 'n' Park"} component={AppScreens} options={{
                            headerRight: () => (
                                <Button style={styles.logout} onPress={onLogout} title="Sign out"> Log out </Button>
                            )
                        }}/>
                    </>
                ) : (
                    <>
                    
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};


const styles = StyleSheet.create({
    logout: {
        backgroundColor: "orange",
        color: "white",
    }
})