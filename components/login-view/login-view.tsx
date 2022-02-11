import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import  Employee  from "../../dtos/employee";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginView(){



    const tempEmp:Employee ={
        id: 101,
        isManager: true,
        fname: "Borat",
        lname: "Sagdiyev",
        username: "borats",
        password: "wordpass"
    }

    const [username, setUsername ] = useState("");
    const [password, setPassword] = useState("");

    
    function userLogin(){
        //use alert class to indicate that the user provided valid/invalid credentials as
        //part of the if logic designed here
        //make sure to import alert 
        
        if ((tempEmp.username === username) && (tempEmp.password === password)){
            AsyncStorage.setItem("@id", String(tempEmp.id));
            AsyncStorage.setItem("@isManager", String(tempEmp.isManager));
            AsyncStorage.setItem("@fname", String(tempEmp.fname));
            AsyncStorage.setItem("@lname", String(tempEmp.lname));
            AsyncStorage.setItem("@username", String(tempEmp.username));
            AsyncStorage.setItem("@password", String(tempEmp.password));
            
            Alert.alert("Welcome Loyal Servant!");
        }else
            Alert.alert("Interloper");

        }

    
/*
app works on MY phone lol
alerts work (success and fail)

next steps not in order
navigation
async storage perhaps?
establishing the appropriate routing paths for post login to 
employee clock-in/check in page call it 

maybe one or two other things
make sure to save all since auto save is disabled

*/
    
    return (<>
    <View>
        <Text>Welcome United Servants of Glorious Kahzakstan!</Text>
        <TextInput placeholder="Username" onChangeText={setUsername}/>
        <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry={true}/>
        <Button onPress={userLogin} title="Login"/>

    </View>
    
    
    </>)
}