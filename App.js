//import { NavigationContainer } from '@react-navigation/native';
//import Navigator from "./navigation/Navigator";
//import { relativeTimeRounding } from "moment";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import SignInScreen from "./navigation/screens/SignInScreen/SignInScreen.js";

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
             <SignInScreen />
        </SafeAreaView>
    );
};

 const styles = StyleSheet.create({
     root:{
         flex: 1,
         backgroundColor: '#000000',
     },
});

export default App;