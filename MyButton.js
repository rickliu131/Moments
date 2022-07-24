import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MyButton = ({title, onPress}) => {
  return (
    <View style={styles.button_container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.button_text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const ColorButton = ({title, onPress, color}) => {
  return (
    <View style={styles.colorbutton_container}>
      <TouchableOpacity style={[styles.colorbutton, {backgroundColor: color}]} onPress={onPress}>
        <Text style={styles.colorbutton_text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button_container: {
    marginTop: 5
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'steelblue',
    height: 33,
    width: 140,
    borderRadius: 5
  },
  button_text: {
    marginTop: 5,
    fontSize: 16,
    color: '#FAFAFA'
  },

  colorbutton_container: {
    marginTop: 5
  },
  colorbutton: {
    alignItems: 'center',
    height: 33,
    width: 140,
    borderRadius: 3
  },
  colorbutton_text: {
    marginTop: 5,
    fontSize: 16,
    color: '#FAFAFA'
  }
});

export { MyButton, ColorButton };
