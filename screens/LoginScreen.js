import React, { memo, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

import { theme } from "../utils/theme";
import { emailValidator, passwordValidator } from "../utils/utils";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import SubText from "../components/SubText";
import { MaterialIcons } from "@expo/vector-icons";

function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    try {
      // Assuming your server endpoint for login is "/login"
      const response = await fetch("https://tpkapp-production.up.railway.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        // If login is successful, set authenticated state to true
        setAuthenticated(true);
        navigation.navigate("TabNavigator");
      } else {
        Alert.alert("Login Failed", data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      // Assuming your server endpoint for logout is "/logout"
      const response = await fetch("https://tpkapp-production.up.railway.app/api/logout", {
        method: "POST",
        headers: {
          "Authorization": "Bearer YOUR_AUTH_TOKEN",
        },
      });
      const data = await response.json();
      if (data.success) {
        // If logout is successful, set authenticated state to false
        setAuthenticated(false);
        // Navigate to the login screen
        navigation.navigate("Login");
      } else {
        Alert.alert("Logout Failed", data.message);
      }
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };


  return (
    <>
      <View style={styles.loginContainer}>
        <View>
          <Header>Welcome back!!</Header>
          <SubText>
            Please fill in your details to log into your account
          </SubText>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputTextContainer}
            placeholder="Louis04real@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            error={!!email.error}
            errorText={email.error}
            autoCompleteType="email"
            textContentType="emailAddress"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              returnKeyType="go"
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
        </View>

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <SecondaryButton onPress={() => navigation.navigate("SignUp")}>
              Sign Up
            </SecondaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={_onLoginPressed}>Login</PrimaryButton>
          </View>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    padding: 20,
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

  label: {
    color: theme.colors.primary,
    fontWeight: "bold",
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
});


