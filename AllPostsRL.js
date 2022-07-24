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
import renderPost from './Post';
import Toast from 'react-native-simple-toast';
import url from './url';
import UserIDContext from './Context';


const AllPostsRL = () => {

  const isFocused = useIsFocused();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async() => {
    setRefreshing(true);
    loadContent().then(() => setRefreshing(false));
  };

  const [content, setContent] = useState([]);
  useEffect(() => console.log(`'Content' just got updated -> ${content}`), [content]);

  const loadContent = async() => {
    let data = {};
    let errorCode = '-1';

    try {
      await fetch(url.clearCookie);
      // 
      // getPostsAll
      //
      const res = await fetch(url.getPostsAll,{
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
    console.log('FOCUSEED!!!!')
  }, [isFocused]); // Trigged without condition


  //7.23 2022 added
  //context, pass user_id

  const [userID, setUserID] = useState('')
  useEffect(() => {
    AsyncStorage.getItem('@user_id')
    .then((value) => {
      setUserID(value)
    })
  })
  

  return(
    <View>
      {content.length > 0 ?
        <View style={styles.container}>
          <UserIDContext.Provider value={{uid: userID, rfFunc: loadContent}}>
            <FlatList data={content} renderItem={renderPost} onRefresh={onRefresh} refreshing={refreshing}/>
          </UserIDContext.Provider>
          
        </View>
        :
        <View style={styles.container_no_content}>
          <Text style={styles.no_content_text}>Don't have anything yet</Text>
          <Text style={styles.no_content_text}>(⌐■_■) !</Text>
        </View>}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F6F6F6'
  },
  container_no_content: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  no_content_text: {
    color: 'gray',
    fontSize: 17,
  }
});

export default AllPostsRL;
