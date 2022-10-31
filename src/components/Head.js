import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import Modals from './Modal';
const Head = () => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {}, [modalVisible]);

  const showModal = () => {
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onBackdropPress={() => console.log('clicked')}
        onDismiss={() => console.log('clicked')}>
        <View
          style={{
            width: 300,
            position: 'absolute',
            top: -20,
            right: -20,
            opacity: 0.8,
          }}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <View>
      <View style={{ width: 600 }}>{showModal()}</View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#075e54',
          height: 100,
          justifyContent: 'space-between',
          paddingBottom: 0,
        }}>
        <View style={{ marginTop: 50, marginLeft: 20 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '400' }}>
            WhatsApp
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 50,
            marginRight: 20,
          }}>
          <View style={{ marginRight: 15 }}>
            <Animated.Text
              style={{
                color: 'white',
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              <Ionicons name='search' size={20} color='#B8CCC8' />
            </Animated.Text>
          </View>
          <View style={{ marginTop: 2 }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Animated.Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                <Entypo name='dots-three-vertical' size={16} color='#B8CCC8' />
              </Animated.Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Head;
const styles = StyleSheet.create({
  centeredView2: {
    width: 400,
    opacity: 0.5,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
