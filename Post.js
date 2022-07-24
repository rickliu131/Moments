import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import url from './url';
import UserIDContext from './Context';


const getProcessedDate = (s) => {
  return (
    s.substring(0, s.lastIndexOf('.')).replace('T', ' ')
  );
}



const deletePost = async (post_data) => {
  console.log(url.delPost)
  const res = await fetch(url.delPost,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //this seems like a must!!! ahhh! find why!
      'Cookie': await AsyncStorage.getItem('@cookie')
    },
    body: JSON.stringify({
      post_id: post_data.POST_ID
    })
  })
  const data = await res.json();
  if (data.ok == 1) {
    Toast.show('post deleted!!');
  } else {
    Toast.show('deletion failed!')
  }
}

const likePost = (post_data) => {

}



const rightContent =  (post) => {
  // console.log(post_data)

  const rectButtonsGenStyle = StyleSheet.create({
    flexDirection: 'row',
    marginBottom: 8,
    marginTop: (post.index == 0 ? 8 : 0)
  });


  return (

    <View style={rectButtonsGenStyle}>
      <UserIDContext.Consumer>
      {(userID) => (
        userID == post.item.USER_ID ? 
        <RectButton style={{backgroundColor: 'gray', padding: 30}} onPress={() => deletePost(post.item)}>
          <Text style={{marginTop: 2, fontSize: 16, color: '#FAFAFA', fontWeight: '500'}}>Delete</Text>
        </RectButton> : <View></View>
      )}
      </UserIDContext.Consumer>
      <RectButton style={{backgroundColor: 'tomato', padding: 30}} onPress={() => likePost(post.item)}>
        <Text style={{marginTop: 2, fontSize: 16, color: '#FAFAFA', fontWeight: '500'}}> Like </Text>
      </RectButton>
    </View>

  );
}

const Post = ({post}) => {

  return(
    <GestureHandlerRootView>
      <Swipeable 
      renderRightActions={() => rightContent(post)}>
        <View style={post.index == 0 ? styles.post_top : styles.post}>
          <Text style={styles.id}>@{post.item.USER_ID}</Text>
          <Text style={styles.text}>{post.item.TEXT}</Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

const renderPost = (post) => {

  // const [userID, setUserID] = useState('')

  // useEffect(() => {
  //   AsyncStorage.getItem('@user_id').then((value) => setUserID(value))
  // })

  

  // console.log(post)
  return (
    // <GestureHandlerRootView>
    //   <Swipeable 
    //     renderRightActions={() => rightContent(post)}>
    //     <View style={post.index == 0 ? styles.post_top : styles.post}>
    //       <Text style={styles.id}>@{post.item.USER_ID}</Text>
    //       <Text style={styles.text}>{post.item.TEXT}</Text>
    //     </View>
    //   </Swipeable>
    // </GestureHandlerRootView>
    <Post post={post} />
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
  },
  del_button: {
    backgroundColor: 'red'
  }
});

export default renderPost;
