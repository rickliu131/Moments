import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Alert} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import url from './url';
import UserIDContext from './Context';

import { ColorButton, MyButton } from './MyButton';


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



const Post = ({post}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return(
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{margin: 2}}>
              <ColorButton
                title='Like'
                onPress={() => {
                  setModalVisible(!modalVisible)
                  likePost(post.item)
                }}
                color='tomato'/>
            </View>

            <UserIDContext.Consumer>
            {(ctValue) => (
              ctValue.uid.toLowerCase() == post.item.USER_ID.toLowerCase() ? 
              <View style={{margin: 2}}>
                <ColorButton
                title='Delete'
                onPress={() => {
                  setModalVisible(!modalVisible)
                  deletePost(post.item)
                  ctValue.rfFunc()
                }}
                color='lightslategrey'/>
              </View> : <View></View>
            )}
            </UserIDContext.Consumer>

            <View style={{margin: 2}}>
              <MyButton
                title='Cancel'
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}/>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => setModalVisible(true)}>
        <View style={post.index == 0 ? styles.post_top : styles.post}>
          <Text style={styles.id}>@{post.item.USER_ID}</Text>
          <Text style={styles.text}>{post.item.TEXT}</Text>
        </View>
      </Pressable>
    </View>

        // <View style={post.index == 0 ? styles.post_top : styles.post}>
        //   <Text style={styles.id}>@{post.item.USER_ID}</Text>
        //   <Text style={styles.text}>{post.item.TEXT}</Text>
        // </View>

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
  },



  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

export default renderPost;
