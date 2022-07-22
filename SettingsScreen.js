// 'use strict';

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SettingsScreen() {
  return(
    <View style={styles.container}>
      <Text style={styles.text_title}>Moments <Text style={styles.text}>by Yuxuan</Text></Text>
      <Text style={styles.text}>App Version: 1.0</Text>
      <View style={{marginTop: 3}}></View>
      <Text style={styles.text_italic}>React Native</Text>
      <Text style={styles.text_italic}>      + Express.js!</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
