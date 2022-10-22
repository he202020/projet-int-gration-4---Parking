import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Accueil</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151515'
    },
    text: {
        color: '#1ccc5b',
        fontWeight: '800'
    }
})