// 'use strict';

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from './url';
import MyButton from './MyButton';

const BGColorContext = React.createContext(null);

function SettingsScreen() {

  // const [realLgStatus, setRealLgStatus] = useState('');
  // const [lgStatus, setLgStatus] = useState('');
  // const [loStatus, setLoStatus] = useState('');
  //
  // async function status(){
  //   const url_islg = url + '/isLoggedIn';
  //   console.log(url_islg);
  //   const res = await fetch(url_islg, {
  //     credentials: 'include'
  //   });
  //   const res_json = await res.json();
  //   console.log("login status/ ->" + JSON.stringify(res_json));
  //   if (res_json.result == 'yes'){
  //     setRealLgStatus('You are logged in ✅');
  //   } else if (res_json.result == 'no'){
  //     setRealLgStatus('You are not logged in ❌');
  //   }
  // }
  //
  // async function login(){
  //   const url_login = url + '/login';
  //   const res = await fetch(url_login, {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       id: 'kevin',
  //       password: '123'
  //     })
  //   });
  //   console.log('Res headers -> ');
  //   for (var pair of res.headers.entries()) {
  //     console.log(pair[0]+ ': '+ pair[1]);
  //   }
  //   const res_json = await res.json();
  //   console.log("login/ ->" + JSON.stringify(res_json));
  //   if (res_json.ok == 1){
  //     setLgStatus('Login action✅');
  //   } else {
  //     setLgStatus('Login action❌');
  //   }
  // }
  //
  // async function logout(){
  //   const url_logout = url + '/logout';
  //   const res = await fetch(url_logout, {
  //     credentials: 'include'
  //   });
  //   const res_json = await res.json();
  //   console.log("logout/ ->" + JSON.stringify(res_json));
  //   if (res_json.ok == 1){
  //     setLoStatus('Logout action✅');
  //   } else {
  //     setLoStatus('Logout action❌');
  //   }
  // }

  // <Button title='Login' onPress={() => login()} />
  // <Button title='Logout' onPress={() => logout()} />
  // <Button title='Check Status' onPress={() => status()} />
  // <Button title='cookies' onPress={() => cookie()} />
  // <View><Text>{realLgStatus}</Text></View>
  // <View><Text>{lgStatus}</Text></View>
  // <View><Text>{loStatus}</Text></View>

  const [bgcolor, setBgcolor] = useState('white');

  return(
    <BGColorContext.Provider value={bgcolor}>
      <BGColorContext.Consumer>
      {value =>
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: value}}>
          <View style={styles.container}>
            <Text style={styles.text_title}>Days <Text style={styles.text}>by Yuxuan</Text></Text>
            <Text style={styles.text}>App Version: 0.2</Text>
            <View style={{marginTop: 3}}></View>
            <Text style={styles.text_italic}>   React Native</Text>
            <Text style={styles.text_italic}>         + Express.js!</Text>
            <MyButton title="Change Theme" onPress={() => {bgcolor == 'white' ? setBgcolor('#202020'):setBgcolor('white')}} />
          </View>
        </View>
      }
      </BGColorContext.Consumer>
    </BGColorContext.Provider>
  )
};

const styles = StyleSheet.create({
  all: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
  },
  text_title: {
    color: 'slategray',
    fontSize: 17,
    fontWeight: 'bold'
  },
  text: {
    color: 'gray',
    fontSize: 15
  },
  text_italic: {
    fontStyle: 'italic',
    color: 'indigo',
    fontSize: 15
  }
});

export default SettingsScreen;
