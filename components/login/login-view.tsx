import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import  Employee  from "../../dtos/employee";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { endpoint } from "../../dev_tools";

export default function LoginView({navigation}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function authenticate() {
        if (!username || !password) {
            return Alert.alert("Enter a username and password.");
        }
        
        axios.patch(
            `${endpoint}/login`,
            JSON.stringify({
                username: username,
                password: password
            }),
            { headers: { "Content-Type": "application/json" } }
        ).then(async (response) => {
            if (response.status !== 200) {
                Alert.alert(`ERROR: ${response.data}`);
            }
            else {
                await AsyncStorage.setItem("@employeeId", String(response.data.employeeId));
                console.log(response.data.isManager);
                await AsyncStorage.setItem("@isManager", String(response.data.isManager));
                console.log(AsyncStorage.getItem("@isManager"));
                await AsyncStorage.setItem("@fname", String(response.data.fname));
                await AsyncStorage.setItem("@lname", String(response.data.lname));

                navigation.navigate("Main");
            }
        })
    }
    
    return (
        <View>
            <Text>Personnel Login</Text>
            <TextInput placeholder="Username" onChangeText={setUsername}/>
            <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry={true}/>
            <Button onPress={authenticate} title="Login"/>
        </View>
    )
}