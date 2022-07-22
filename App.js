import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import WriteScreen from './WriteScreen';
import AccountScreen from './AccountScreen';
import SettingsScreen from './SettingsScreen';


export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen name='Home' component={HomeScreen}
                    options={{ tabBarIcon: ({ color, size }) => (<Ionicons name='journal' color={color} size={size} />) }} />
        <Tab.Screen name='Write' component={WriteScreen}
                    options={{ tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name='feather' color={color} size={size} />) }} />
        <Tab.Screen name='Account' component={AccountScreen}
                    options={{ tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name='account' color={color} size={size} />) }} />
        <Tab.Screen name='Settings' component={SettingsScreen}
                    options={{ tabBarIcon: ({ color, size }) => (<Ionicons name='settings' color={color} size={size} />)}} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
