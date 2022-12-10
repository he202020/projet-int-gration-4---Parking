//import { NavigationContainer } from '@react-navigation/native';
//import Navigator from "./navigation/Navigator";
//import { relativeTimeRounding } from "moment";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
//import SignInScreen from "./navigation/screens/SignInScreen/SignInScreen.js";
import SignUpScreen from "./navigation/screens/SignUpScreen/SignUpScreen.js";

// export default function App() {
//     return (

//          <NavigationContainer>
//              <Navigator />
//          </NavigationContainer>
//      );
// }

//<SignInScreen />

const App = () => {
    return (
        <SafeAreaView style={styles.root}>
             <SignUpScreen />
        </SafeAreaView>
    );
};

 const styles = StyleSheet.create({
     root:{
         flex: 1,
         backgroundColor: '#2e8b57',
     },
});

export default App;