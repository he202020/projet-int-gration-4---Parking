import React, {useRef, useState} from 'react'
import {View,Text,TextInput,StyleSheet,FlatList} from "react-native"


const data = [
    {parking_id:"1",parking_name:"Magritte",parking_opening_hour:"08:30:00",parking_closure_hour:"18:00:00", parking_adress:"Av. du Ciseau 10, 1348 Ottignies-Louvain-la-Neuve",parking_maximum_place:50},
    {parking_id:"2",parking_name:"Leclercq",parking_opening_hour:"09:00:00",parking_closure_hour:"19:00:00",parking_adress:"Bd du S, 1348 Ottignies-Louvain-la-Neuve",parking_maximum_place:60},
    {parking_id:"3",parking_name:"Wallons",parking_opening_hour:"07:00:00",parking_closure_hour:"16:30:00",parking_adress:"1348 Ottignies-Louvain-la-Neuve",parking_maximum_place:55},
    {parking_id:"4",parking_name:"Brol",parking_opening_hour:"08:00:00",parking_closure_hour:"16:00:00",parking_adress:"hgjhfjhgfjf",parking_maximum_place:120}
    ];

    const homeScreen = () => {
        const  [parking_donnee, setData] = useState(data);

        const item = ({ item }) => {
            return(
                <View style={styles.text}>
                    <Text>
                        Parking : {item.parking_name} {'\n\n'}
                        {item.parking_maximum_place} places max {'\n\n'}{'\n\n'}
                    </Text>
                </View>
            );
    };

    const searchName = (input) => {
        let data = parking_donnee
        let searchData = data.filter((item)=>{
            return item.parking_name.toLowerCase().includes(input.toLowerCase())
        });
        setData(searchData)
    };

    return(
        <View style={ {flex:1, justifyContent : "center", alignItems:"center", backgroundColor : "lightblue", }}>
            <View>
                <TextInput
                    placeholder= "Search Name"
                    onChangeText= {(input)=> {
                    searchName(input);
                    }}
                />
            </View>

            <FlatList
                data = {parking_donnee}
                renderItem={item}
                keyExtractor={(item,index) => index.toString()}
            />
        </View>
    );
};

    export default homeScreen;

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontWeight: '800',
        color: '#eedddd',
    }

});