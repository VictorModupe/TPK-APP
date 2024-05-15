import React, { memo, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import Header from "../components/Header";
import { theme } from "../utils/theme";
import { emailValidator, passwordValidator } from "../utils/utils";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import SubText from "../components/SubText";
import { MaterialIcons } from "@expo/vector-icons";

function SetPassword() {
  const navigation = useNavigation();

  const [password, setPassword] = useState({ value: "", error: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  function nextHandler() {
    navigation.navigate("ResetConfirmPass");
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <View>
            <Image source={require("../assets/lock.png")} />
            <Header>Set your password</Header>
            <SubText style={styles.subText}>
              Please create your new account password
            </SubText>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Password"
                returnKeyType="next"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: "" })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={togglePasswordVisibility}
              >
                <MaterialIcons
                  name={passwordVisible ? "visibility-off" : "visibility"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Retype Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: "" })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={togglePasswordVisibility}
              >
                <MaterialIcons
                  name={passwordVisible ? "visibility-off" : "visibility"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <PrimaryButton onPress={nextHandler}>Continue</PrimaryButton>
          </View>
        </View>
      </View>
    </>
  );
}

export default SetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.accent,
  },
  loginContainer: {
    padding: 20,
    marginTop: 70,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    marginTop: 32,
    marginBottom: 20,
    gap: 20,
  },
  inputTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: 30,
    backgroundColor: "white",
  },
  inputText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: 30,
    backgroundColor: "white",
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  subText: {
    fontSize: 22,
  },
});
