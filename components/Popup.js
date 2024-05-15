// Popup.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Popup = ({ title, message, onClose }) => {
  return (
    <View style={styles.popupContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeButton}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
  },
});

export default Popup;
