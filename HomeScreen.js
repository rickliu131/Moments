import React from 'react';
import AllPostsRL from './AllPostsRL';
import MyPostsRL from './MyPostsRL';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const HomeScreen = () => {
  const Tab = createMaterialTopTabNavigator();
  
  return(
    <Tab.Navigator>
      <Tab.Screen name="All Posts" component={AllPostsRL} />
      <Tab.Screen name="Mine" component={MyPostsRL}/>
    </Tab.Navigator>
  )
};

export default HomeScreen;
