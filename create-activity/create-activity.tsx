import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  StyleSheet,
  Alert,
  Pressable,
  FlatList,
} from 'react-native';
import { Activity, backendAddress } from '../dtos/Activity';
import CancelModal from '../components/cancel-modal/cancel-modal';

export default function CreateActivity() {
  const [actName, setActName] = useState<string>('');
  const [actDesc, setActDesc] = useState<string>('');
  const [actStart, setActStart] = useState<string>('');
  const [actEnd, setActEnd] = useState<string>('');
  const [actLocation, setActLocation] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [modalDetails, setModalDetails] = useState({});

  useEffect(() => {
    getActivities();
  }, []);

  async function getActivities() {
    try {
      const response = await axios.get(`${backendAddress}/activities`);
      const acts: Activity[] = response.data;
      setActivities(acts);
    } catch (error) {
      console.log(error);
    }
  }

  async function addActivity() {
    try {
      const response: AxiosResponse = await axios.post(
        `${backendAddress}/activities`,
        {
          id: '',
          title: actName,
          desc: actDesc,
          startTime: Number(actStart),
          endTime: Number(actEnd),
          location: actLocation,
          status: 'On Schedule',
        }
      );
      const act: Activity = response.data;
      Alert.alert(`Created activity '${act.title}' with id: ${act.id}`);
      getActivities();
    } catch (error) {
      console.log(error);
    }
  }

  const Item = ({ id, title, desc, startTime, endTime, location, status }) => (
    <Pressable
      onPress={() => {
        setModalVisible(true);
        setModalDetails({
          id: id,
          title: title,
          desc: desc,
          startTime: startTime,
          endTime: endTime,
          location: location,
          status: status,
        });
      }}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      title={item.title}
      desc={item.desc}
      startTime={item.startTime}
      endTime={item.endTime}
      location={item.location}
      status={item.status}
    />
  );

  return (
    <View style={styles.container}>
      <Text>Add a New Event</Text>
      <TextInput
        placeholder='Activity Name'
        value={actName}
        onChangeText={setActName}
      />
      <TextInput
        placeholder='Activity Description'
        value={actDesc}
        onChangeText={setActDesc}
      />
      <TextInput
        placeholder={'Start Time'}
        keyboardType='numeric'
        value={String(actStart)}
        onChangeText={setActStart}
      />

      <TextInput
        placeholder='End Time'
        keyboardType='numeric'
        value={actEnd}
        onChangeText={setActEnd}
      />
      <TextInput
        placeholder='Location'
        value={actLocation}
        onChangeText={setActLocation}
      />
      <Button title='Submit-Activity' onPress={addActivity} />

      <Text>Cancel an Event:</Text>
      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}></FlatList>

      <CancelModal
        details={modalDetails}
        modalVisible={modalVisible}
        onClose={() => setModalVisible(!modalVisible)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
