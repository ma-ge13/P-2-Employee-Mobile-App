import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { Activity, backendAddress } from '../../dtos/activity';

export default function CancelModal({ details, modalVisible, onClose }) {
  const [cancelItem, setCancelItem] = useState<Activity>();
  async function cancelActivity() {
    try {
      const response = await axios.patch(
        `${backendAddress}/activities/${details.id}/cancel`
      );
      setCancelItem(response.data);
      Alert.alert(
        `Cancelled ${cancelItem.title} activity with id: ${cancelItem.id}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onClose();
      }}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Cancel Event:</Text>
          <Text style={styles.modalText}>Details: {details.desc}</Text>
          <Text style={styles.modalText}>
            Start Time: {new Date(details.startTime * 1000).toLocaleString()}
          </Text>
          <Text style={styles.modalText}>
            End Time: {new Date(details.endTime * 1000).toLocaleString()}
          </Text>
          <Text style={styles.modalText}>Location: {details.location}</Text>
          <Text style={styles.modalText}>Status: {details.status}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={cancelActivity}>
            <Text style={styles.textStyle}>Cancel Event</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => onClose()}>
            <Text style={styles.textStyle}>Close Info</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
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
