import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from "./navigation/TabBar";
import HomeScreen from "./navigation/screens/HomeScreen";
import ParkingScreen from "./navigation/screens/ParkingScreen";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
                <Tab.Screen name="Accueil" component={HomeScreen} />
                <Tab.Screen name="Liste des parkings" component={ParkingScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}