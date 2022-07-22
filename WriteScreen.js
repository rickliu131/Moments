import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import url from './url'
import MyButton from './MyButton';


function WriteScreen() {
  const [text, setText] = useState('');

  const savePost = async() => {
    //is logged in check!
    //check all fetch clearCookie senarios
    let data = {};
    let errorCode = '-1';

    try {
      await fetch(url.clearCookie);
      const res = await fetch(url.addPost, {
        method: 'POST',
        body: JSON.stringify({
          text: text
        }),
        headers: {
          'Content-Type': 'application/json',
          'Cookie': await AsyncStorage.getItem('@cookie')
        }
      });
      data = await res.json();
      if (data.ok != 1) {
        if (data.msg == 'need to login') {
          errorCode = '2a';
        } else if (data.msg == 'invalid parameter'){
          errorCode = '2b';
        } else {
          errorCode = '2c';
        }
      }
    } catch (err) {
      console.error(err);
      errorCode = '1';
    }
    console.log('data -> ' + JSON.stringify(data));
    console.log("error code -> " + errorCode);

    if (errorCode == '-1') {
      Toast.show('Saved✅');
    } else if (errorCode == '1') {
      Toast.show(`Network Error🔗❌`);
    } else if (errorCode == '2a') {
      Toast.show('Login Required🔑');
    } else if (errorCode == '2b') {
      Toast.show('Invalid Content📝❌');
    } else {
      Toast.show(`Error #${errorCode}❌`);
    }
    setText('');
  }

  return(
    <View style={styles.container}>
      <View style={styles.text_input_container}>
        <TextInput placeholder="...What's interesting today?" multiline={true}
        style={styles.text_input} value={text} onChangeText={(t) => setText(t)} />
      </View>
      <View style={styles.button_container}><MyButton title='Save' onPress={() => savePost()} /></View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_input_container: {
    flex: 0.88,
    width: '85%',
    padding: 20,
    backgroundColor: '#E2E2E2',
    borderColor: '#E2E2E2',
    borderRadius: 8,
    borderWidth: 2,
  },
  text_input: {
    width: '100%',
    height:'100%',
    fontSize: 15,
    color: 'dimgray'
  },
  button_container: {
    marginTop: 10
  }

});

export default WriteScreen;
