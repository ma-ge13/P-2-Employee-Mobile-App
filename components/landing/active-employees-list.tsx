import { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { endpoint } from "../../dev_tools";
import axios from "axios";


console.log("Reached");
export default function ActiveEmployeesList() {
    
    console.log("Reached");
    const [activeEmployees, setActiveEmployees] = useState([]);
    console.log("Reached", activeEmployees);

    console.log("Reached", activeEmployees);
    async function getActiveEmployees() {
        console.log("Reached", activeEmployees);
        const latestActiveEmployees = [];
        let employees;
        let latestWorkLog;

        console.log("Reached");
        await axios.get(`${endpoint}/employees`).
            then((response) => {
                console.log("Reached", response.data);
                employees = response.data;
            });
                
        for (const employee of employees) {
            
            const employeeName = {name: `${employee.lname}, ${employee.fname}`};
            console.log("Reached", employeeName);

            await axios.get(`${endpoint}/employees/${employee.id}/worklogs`).
                then((response) => {
                    latestWorkLog = response.data.splice(-1)[0];
                    console.log("Reached", latestWorkLog);
                });
            
            if (latestWorkLog.action === "CHECKIN") {
                latestActiveEmployees.push(employeeName);
            }
        }
        
        console.log("Reached", latestActiveEmployees);
        return latestActiveEmployees;
    }
    
    useEffect(() => {
        (async () => {
            console.log("Reached");
            setActiveEmployees(await getActiveEmployees());
            console.log("Reached", activeEmployees);
        })();
    }, []);

    const Item = ({name})=>(
        <View>
            <Text>{name}</Text>
        </View>
    );

    const RenderItem = ({item}) =>(
        <Item name={item.name} />
    );

    console.log("Reached", activeEmployees);
    return (
      <View style={{ paddingTop: 45, paddingLeft: 15 }}>
        <Text>Active Employees:</Text>
            <FlatList
                data={activeEmployees}
                renderItem={RenderItem}
            />
      </View>
    );
}