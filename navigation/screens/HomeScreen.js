import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Click ' n ' Park ! </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#171717'
    },
    text: {
        color: '#eedddd',
        fontWeight: '800'
    }
})