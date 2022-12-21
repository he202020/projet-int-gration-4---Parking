import {Dimensions, StyleSheet, Text, View} from "react-native";
import {SelectList} from "react-native-dropdown-select-list/index";
import React, {useEffect, useState} from "react";
import CalendarPicker from "react-native-calendar-picker";
import alert from "react-native-web/dist/exports/Alert";


function StatisticsUsingDay(){
    const [isLoading, setLoading] = useState(true);
    const [selected, setSelected] = useState("");
    const [selectedDate, setSelectedDate] = useState(null)
    const [data, setData] = React.useState([])

    const getParkingsList = async () => {
        try {
            const response = await fetch('https://0095-2a02-2788-f4-978-927-28bb-1b62-b9f2.eu.ngrok.io/parking');
            const returnResponse = await response.json();
            let newArray = []
            returnResponse.forEach(function(x){newArray.push({'key':x.parking_id, 'value':x.parking_name})})
            //console.log(newArray)
            setData(newArray);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getParkingsList();
    }, []);

    return(
        <View style={styles.titelContainer}>
            <View>
                <SelectList style={styles.listContainer}
                            setSelected = {setSelected} data ={data}
                            onSelected ={()=> alert(selected)}
                            placeholder={'Choisissez un parking SVP'}/>
            </View>
            <CalendarPicker style={styles.dateContainer} onDateChange={setSelectedDate}/>
        </View>
    )
}
export default StatisticsUsingDay

const styles = StyleSheet.create({
    titelContainer:{
        padding:15,
        backgroundColor:'#abc',
    },
    textContainer:{
     flexDirection:'column',
     fontSize: 25,
     color: 'green',
    textAlign:'center'
    },
    listContainer:{

    },
  dateContainer:{
     flex:3,
    color:'red',
    }
})