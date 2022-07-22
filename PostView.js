import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Post = ({data}) => {
  const strProcess = (s) => (s.substring(0, s.lastIndexOf('.')).replace('T', ' '));
  return(
    <View>
      <View style={styles.first}><Text style={styles.date}>{strProcess(data.DATE)}</Text></View>
      <View style={styles.second}><Text style={styles.text}>{data.TEXT}</Text></View>
      <View style={styles.third}><Text style={styles.id}>{data.USER_ID}</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
  first: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  second: {
    paddingTop: 3,
    paddingBottom: 3
  },
  third: {},
  date: {
    fontSize: 15,
    color: 'slategray',
  },
  text: {
    color: 'gray',
    fontSize: 15,
  },
  id: {
    color: '#8C826B',
    fontSize: 15,
    textAlign: 'right'
  }
});

export default Post;
