import React, { memo, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import { emailValidator } from "../utils/utils";
import Header from "../components/Header";
import { theme } from "../utils/theme";
import { useNavigation } from "@react-navigation/native";
import SubText from "../components/SubText";
import PrimaryButton from "../components/PrimaryButton";

function ResetConfirmation() {
  const navigation = useNavigation();

  const [email, setEmail] = useState({ value: "", error: "" });

  function nextHandler() {
    navigation.navigate("Login");
  }

  return (
    <>
      <View style={styles.loginContainer}>
        <View style={styles.container}>
          <Image source={require("../assets/check.png")} />
          <Text style={styles.title}>Hi! Dami</Text>
          <SubText>
            You have successfully reset your password, you can now login back
            into your App account
          </SubText>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextHandler}>Go to login</PrimaryButton>
          </View>
        </View>
      </View>
    </>
  );
};

export default ResetConfirmation;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    padding: 20,
  },
  container: {
    marginTop: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});


