import {StyleSheet, Text, View} from "react-native";
import {SelectList} from "react-native-dropdown-select-list/index";
import {useState} from "react";
import ParkingList from "./ParkingList";
import CalendarPicker from "react-native-calendar-picker";

function StatisticsUsingDay(){
    const [parking, setParking] = useState("");
    const [selectedDate, setSelectedDate] = useState(null)
    const datas = ParkingList.data
    return(
        <View style={styles.titelContainer}>
            <View>
                <SelectList style={styles.listContainer}
                            data ={datas}
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
        backgroundColor:'#aff000',
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