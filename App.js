import { NavigationContainer } from '@react-navigation/native';
import Navigator from "./navigation/Navigator";
import * as React from 'react';

const App = () =>  {
    return (
        <NavigationContainer>
            <Navigator />
        </NavigationContainer>
    );
}
export default App;
