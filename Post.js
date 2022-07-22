import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getProcessedDate = (s) => {
  return (
    s.substring(0, s.lastIndexOf('.')).replace('T', ' ')
  );
}

const renderPost = (post) => {
  // console.log(post)
  return (
    <View style={post.index == 0 ? styles.post_top : styles.post}>
      <Text style={styles.id}>@{post.item.USER_ID}</Text>
      <Text style={styles.text}>{post.item.TEXT}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    color: '#353535',
    fontSize: 15,
  },
  id: {
    color: '#353565',
    fontSize: 15,
    fontWeight: '500'
  },
  date: {
    color: '#353535',
    fontSize: 15,
    textAlign: 'right',
  },
  location: {},
  post_top: {
    marginTop: 8,
    marginBottom: 8,
    padding: 20,
    backgroundColor: 'white',
  },
  post: {
    marginBottom: 8,
    padding: 20,
    backgroundColor: 'white',
  }
});

export default renderPost;
