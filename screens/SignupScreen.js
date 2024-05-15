import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Header from "../components/Header";
import { theme } from "../utils/theme";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from "../utils/utils";
import { useNavigation } from "@react-navigation/native";
import SubText from "../components/SubText";
import SecondaryButton from "../components/SecondaryButton";
import PrimaryButton from "../components/PrimaryButton";
import { MaterialIcons } from "@expo/vector-icons";

function SignupScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const _onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    try {
      const response = await fetch("https://tpkapp-production.up.railway.app/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.value, email: email.value, password: password.value }),
      });
      const data = await response.json();
      if (data.success) {
        // Signup successful, navigate to the dashboard or any other screen
        navigation.navigate("Dashboard");
      } else {
        Alert.alert("Signup Failed", data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
    };

  return (
    <>
      <View style={styles.loginContainer}>
        <View>
          <Header>Welcome to App</Header>
          <SubText>Sign up and let's get you started </SubText>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputTextContainer}
            placeholder="Username"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: "" })}
            error={!!name.error}
            errorText={name.error}
          />

          <TextInput
            style={styles.inputTextContainer}
            placeholder="Louis04real@gmail.com"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.inputTextContainer}
            placeholder="Unique code"
            returnKeyType="next"
            // value={email.value}
            // onChangeText={(text) => setEmail({ value: text, error: "" })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="oneTimeCode"
            keyboardType="default"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
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
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.label}>
            By signing up, you agree to the Terms of Service and Privacy Policy
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={_onSignUpPressed}>Sign Up</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <SecondaryButton onPress={() => navigation.navigate("Login")}>
              Login
            </SecondaryButton>
          </View>
        </View>
      </View>
    </>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    padding: 20,
  },
  label: {
    color: "#000000",
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
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
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
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
