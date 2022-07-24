import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import url from './url';
import MyButton from './MyButton';

const AccountScreen = () => {

  const [loginStatus, setLoginStatus] = useState(0);
  const [id, setID] = useState('');
  const [pwd, setPWD] = useState('');
  const [userInfo, setUserInfo] = useState({});

  const update = async() => {
    await fetch(url.clearCookie);
    try {
      const res_islg = await fetch(url.isLoggedIn, {
        method: 'GET',
        // credentials: 'include',
        headers: {
          'Cookie': await AsyncStorage.getItem('@cookie')
        }
      });
      const data_islg = await res_islg.json();
      if (data_islg.ok == 1 && data_islg.result == 'yes') {
        setLoginStatus(1);
        try { //get user info
          const res_uinfo = await fetch(url.getUserInfo, {
            method: 'GET',
            headers: {
              'Cookie': await AsyncStorage.getItem('@cookie')
            }
          });
          const data_uinfo = await res_uinfo.json();
          if (data_uinfo.ok == 1) {
            setUserInfo(data_uinfo.result);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        setLoginStatus(0);
        setUserInfo({});
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const prep = async() => {
      update();
    };
    prep();
  }, []);

  const login = async() => {
    let errorCode = '-1';
    try {
      const res_newid = await fetch(url.isIDNew+`?id=${id}`);
      const data_newid = await res_newid.json();
      if (data_newid.ok == 1) {
        if (data_newid.result == 'yes') {
          // Register
          const res_register = await fetch(url.register, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: id,
              password: pwd
            })
          });
          const data_register = await res_register.json();
          if (data_register.ok == 1) {
            console.log('Registered...');
            Toast.show('Registered👌');
            login();
          } else {
            // Register failed
            errorCode = '3';
            Toast.show(`Registration Failed: ${data_register.msg}❌`);
          }
        } else {
          // Login
          const res_login = await fetch(url.login, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: id,
              password: pwd
            })
          });
          const data_login = await res_login.json();
          if (data_login.ok == 1) {
            const cookie = res_login.headers.get('Set-Cookie');
            await AsyncStorage.setItem('@cookie', cookie);
            // 7.23 2022 added
            // also store the user_id
            // for post operations on the readings screen
            // 后面update()中 等 userInfo set好的再拿其中的user_id store也可以？更好？
            await AsyncStorage.setItem('@user_id', id);
            //
            console.log(`Cookie[${cookie}] has been saved locally...`);
            console.log('Logged In');
            Toast.show('Logged In🎉');
            // other tasks
            setID(''); //clear inputs
            setPWD('');
            await fetch(url.clearCookie); //clear real cookie, avoid it being sent to server in the future
            await update(); //update login status
          } else {
            // Login failed
            errorCode = '4';
            Toast.show(`Login Failed: ${data_login.msg}❌`);
          }
        }
      } else {
        errorCode = '2';
        Toast.show(`Error #${errorCode}: ${data_newid.msg}❌`);
      }
    } catch (err) {
      console.error(err);
      errorCode = '1';
      Toast.show(`Network Error🔗❌`);
    }
  };

  const logout = async() => {
    await fetch(url.logout);
    await AsyncStorage.removeItem('@cookie');
    // 7.23 2022 added
    // since also stored user_id, not delete if logout
    await AsyncStorage.removeItem('@user_id');
    //
    //userInfo will be wiped automatically in update()
    Toast.show('Logged Out👌');
    await update();
  }

  return(
    <View>
      {(loginStatus == 1) ?
      <View style={styles.individual_container}>
        <View style={styles.loggedin_symbol_container}><Text style={styles.loggedin_symbol}>✅</Text></View>
        <View>
          <Text style={styles.loggedin_text}>You're Logged In as
            <Text style={styles.loggedin_text_name}> @{userInfo.ID}</Text>
          </Text>
        </View>
        <View style={styles.logout_button_container}>
          <MyButton title='Logout' onPress={() => logout()} />
        </View>
      </View>
      :
      <View style={styles.individual_container}>
        <View style={styles.title_all_container}>
          <View><Text style={styles.title_text}>Login to Your Account</Text></View>
          <View><Text style={styles.title_note_text}>(New users will be automatically registered)</Text></View>
        </View>
        <View style={styles.input_all_container}>
          <View style={styles.input_labels_container}>
            <View><Text style={styles.input_labels}>ID</Text></View>
            <View><Text style={styles.input_labels}>Password</Text></View>
          </View>
          <View style={styles.input_boxs_container}>
            <View><TextInput style={styles.input_boxs} value={id} onChangeText={(t) => setID(t)} placeholder='🆔'/></View>
            <View><TextInput style={styles.input_boxs} value={pwd} onChangeText={(t) => setPWD(t)} secureTextEntry={true} placeholder='🔑'/></View>
          </View>
        </View>
        <View>
          <MyButton title='Login/Register' onPress={() => login()} />
        </View>
      </View>}
    </View>
  );


};

const styles = StyleSheet.create({
  individual_container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title_all_container: {
    alignItems: 'center'
  },
  title_text: {
    color: 'darkslategray',
    fontSize: 27.5,
  },
  title_note_text: {
    color: 'gray',
    marginTop: 3,
    fontSize: 13
  },
  input_all_container: {
    flexDirection: 'row',
    marginTop: 10
  },
  input_labels_container: {
    marginRight: 6
  },
  input_boxs_container: {
  },
  input_labels: {
    textAlign: 'right',
    color: 'dimgray',
    fontSize: 19
  },
  input_boxs: {
    fontSize: 19,
    color: 'dimgray',
    width: 90,
    textAlign: 'center'
  },
  loggedin_symbol_container: {
    margin: 10
  },
  loggedin_symbol: {
    marginTop: 15,
    fontSize: 45
  },
  loggedin_text: {
    fontSize: 19,
    color: 'gray',
  },
  loggedin_text_name: {
    fontSize: 21,
    color: 'slategray',
    fontWeight: 'bold'
  },
  logout_button_container: {
    marginTop: 10
  }


});



export default AccountScreen;
