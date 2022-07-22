// 'use strict';
// Conventions:
// use '' when possible
// camelCase naming for declarations
// One blank space after // comment symbol
// One blank space before '{'

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import Post from './DiaryView';
import Toast from 'react-native-simple-toast';
import MyButton from './MyButton';
import url from './url';

const HomeScreen = () => {

  const isFocused = useIsFocused();

  const [content, setContent] = useState([]);
  useEffect(() => console.log(`'Content' just got updated -> ${content}`), [content]);

  const loadContent = async() => {
    let data = {};
    let errorCode = '-1';

    try {
      await fetch(url.clearCookie);
      const res = await fetch(url.getPosts,{
        headers: {
          'Cookie': await AsyncStorage.getItem('@cookie')
        }
      });
      data = await res.json();
      if (data.ok != 1) {
        if (data.msg == 'need to login') {
          errorCode = '2a';
        } else {
          errorCode = '2b';
        }
      }
    } catch (err) {
      console.error(err);
      errorCode = '1';
    }
    console.log('data -> ' + JSON.stringify(data));
    console.log("error code -> " + errorCode);

    if (errorCode == '-1') {
      setContent(data.result.reverse());
      Toast.show('Posts Loaded✅');
    } else {
      setContent([]);
      if (errorCode == '1') {
        Toast.show(`Network Error🔗❌`);
      } else if (errorCode == '2a') {
        Toast.show('Login Required🔑');
      } else {
        Toast.show(`Error #${errorCode}❌`);
      }
    }
  }

  useEffect(() => {
    const prep = async() => {
      loadContent();
    }
    prep();
  }, [isFocused]); // Trigged without condition

  const renderPost = (post) => {
    return (
      <Post data={post.item} />
    );
  }

  return(
    <View>
      {content.length > 0 ?
        <View style={styles.individual_container}>
          <View style={styles.list_container}><FlatList data={content} renderItem={renderPost}/></View>
          <View style={styles.button_container}><MyButton title='Refresh' onPress={() => loadContent()}/></View>
        </View>
        :
        <View style={styles.individual_container}>
          <Text style={styles.nopost_text}>Don't have anything yet...</Text>
        </View>}
    </View>
  )
};

const styles = StyleSheet.create({
  individual_container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  list_container: {
    flex: 0.95,
    width: '85%'
  },
  button_container: {
    margin: 7
  },
  nopost_text: {
    color: 'gray',
    fontSize: 15
  }
});


export default HomeScreen;
