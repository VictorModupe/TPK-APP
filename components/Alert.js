import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { theme } from "../utils/theme";

function CustomAlert({
  isVisible,
  message,
  onConfirm,
  onCancel,
//   confirmationmessage,
}) {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.5} animationIn="fadeIn">
      <View style={styles.modalContainer}>
      <AntDesign name="logout" size={45} color="red" />
        <View style={styles.text}>
          <Text style={styles.message}>{message}</Text>
          {/* <Text style={styles.confirmationmessage}>{confirmationmessage}</Text> */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button1} onPress={onCancel}>
            <Text style={styles.buttonText1}>No, Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={onConfirm}>
            <Text style={styles.buttonText2}>Yes, Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 28,
    padding: 20,
    alignItems: "center",
    gap: 24,
  },
  text: {
    // margin: -10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  confirmationmessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button1: {
    backgroundColor: theme.colors.primary,
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  button2: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  buttonText1: {
    color: "white",
    fontSize: 16,
  },
  buttonText2: {
    color: theme.colors.primary,
    fontSize: 16,
  },
});

export default CustomAlert;
