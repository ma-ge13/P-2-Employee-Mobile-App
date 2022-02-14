import { useState } from "react";
import {View, Text, Switch, Alert} from "react-native";
import WorkLog from "../../dtos/worklog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActiveEmployeesList from "./active-employees-list";
import axios from "axios";
import { endpoint } from "../../dev_tools";

export default function LandingPage(){

    const [isEnabled, setEnabled] = useState(false);
    let isManager;
    let employeeId;

    async function getStorageData() {
        employeeId = await AsyncStorage.getItem("@employeeId");
        isManager = await AsyncStorage.getItem("@isManager").toString() === "true";
        
        console.log(await AsyncStorage.getItem("@isManager").toString());
    }

    async function sendWorkLog(){
        setEnabled(!isEnabled);
        
        const logging: WorkLog = {
            wId: 0,
            type: "",
            timestamp: 0
        }

        //toggle switch availability to CHECKIN
        //generate and send CHECKIN WorkLog to PostGres
        if(isEnabled){
            logging.type = "CHECKIN";
        }
        else 
            logging.type = "CHECKOUT";
        
        await axios.post(
            `${endpoint}/employees/${employeeId}/worklogs`,
            JSON.stringify(logging),
            { headers: { "Content-Type": "application/json" } }
        );

        Alert.alert(
            (logging.type === "CHECKIN" ?
                "You are now clocked-in!" :
                "You are now clocked-out!")
        );
    }
    
    getStorageData();

    return (
        <>
            {isManager &&
                <View>
                    <ActiveEmployeesList />
                </View>
            }
            
            <View>
                <Text>Clock-in or Clock-out by toggling the switch!</Text>
                <Switch value={isEnabled} onValueChange={sendWorkLog}/>     
            </View>
        </>
    )
}