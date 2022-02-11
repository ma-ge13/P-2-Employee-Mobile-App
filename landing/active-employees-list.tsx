import React from "react";
import { View, FlatList, Text } from "react-native";



export default function ActiveEmployeesList(){

    const activeEmployees=[
        {name: "Joe Blow"},
        {name: "Jane Blow"},
        {name: "Steve Blow"},
        {name: "Aaron Blow"}
    ]

    const Item = ({name})=>(
        <View>
            <Text>{name}</Text>
        </View>
    );

    const RenderItem = ({item}) =>(
        <Item name={item.name} />
    );

  //  const roster= activeEmployees.map(e => RenderItem(e));

    
//View padding was because of how it was displaying due to defaults left in place in the App.tsx file
//is safe to remove from line 31
    return(
    <View style={{paddingTop:45, paddingLeft:15}}> 
        <Text>Active Employees:</Text>
        <FlatList data={activeEmployees} renderItem={RenderItem} />
    </View>
    );



}