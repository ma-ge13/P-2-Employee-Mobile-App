import { useState } from "react";
import {View, Text, Switch, Alert} from "react-native";
import WorkLog from "../dtos/worklog";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LandingPage(){

    const [isEnabled, setEnabled] = useState(false);
    
    const isManager =  (AsyncStorage.getItem("@isManager")).toString() === "true";

    const tempLog:WorkLog={
        wId: 111,
        type: "",
        timestamp: Date.now()
    }


    /*
    the objective is that regardless as to whether or not the 
    employee is already on or off clock, we need the switch
    to toggle their on/off clock status

    further, the function is to be both specific, yet general
    in its operation as to perform t-he changing of both the 
    textual output and state all at the same time

    toggle one way changes on the clock text and state
    other way does the opposite

    */


   function sendWorkLog(){
        setEnabled(!isEnabled);
        //toggle switch availability to CHECKIN
        //generate and send CHECKIN WorkLog to PostGres
        if(isEnabled){
            tempLog.type = "CHECKIN"
        }else 
            tempLog.type = "CHECKOUT"
        Alert.alert(`${tempLog.type} ${tempLog.wId} ${tempLog.timestamp}`);
   }

   

    
    return (



        <View>
            <Text>Hello Glorious Employee!</Text>
            <Switch value={isEnabled} onValueChange={sendWorkLog}/>     
        </View>
    )
}