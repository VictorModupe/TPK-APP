import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";

import Input from "../Auth/Input";
import Header from "../Header";
import PrimaryButton from "../PrimaryButton";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

function AuthForm({ onSubmit, credentialsInvalid, isLogin }) {
  const [enteredFullName, setEnteredFullName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errors, setErrors] = useState({}); // State for managing validation errors


  const {
    fullname: fullnameIsInvalid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "fullname":
        setEnteredFullName(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  }

  async function submitHandler() {
    try {
      // Validate input using Yup schema
      await validationSchema.validate({
        fullname: enteredFullName,
        email: enteredEmail,
        password: enteredPassword,
      }, { abortEarly: false });
  
      // If validation passes, submit the form
      onSubmit({
        fullname: enteredFullName,
        email: enteredEmail,
        password: enteredPassword,
      });
  
      // Clear the errors state
      setErrors({});
    } catch (validationErrors) {
      // Handle validation errors
      const formattedErrors = {};
      validationErrors.inner.forEach(error => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  }


  return (
    <View>
      <View>
        {!isLogin && (
          <Input
            label="Full Name"
            keyboardType="default"
            placeholder="Full Name"
            value={enteredFullName}
            // onUpdateValue={updateInputValueHandler.bind(this, "fullname") //You're using arrow functions for event handlers, which is a good practice. However, in your commented-out code, you were using bind(this) to bind this context. With arrow functions, you don't need to bind this explicitly.
            onUpdateValue={(value) => updateInputValueHandler("fullname", value)} 

          />
        )}
        <Input
          label="Email Address"
          keyboardType="email-address"
          placeholder="Email Address"
          // onUpdateValue={updateInputValueHandler.bind(this, "email")}
          onUpdateValue={(value) => updateInputValueHandler("email", value)}
          value={enteredEmail}
          isInvalid={emailIsInvalid}
        />
        <Input
          label="Password"
          secure
          placeholder="*********"
          // onUpdateValue={updateInputValueHandler.bind(this, "password")}
          onUpdateValue={(value) => updateInputValueHandler("password", value)}
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
      </View>
      <View style={styles.emailPass}>
        {/* Display validation errors if any */}
        {Object.keys(errors).map((key, index) => (
          <Text key={index} style={styles.errorText}>{errors[key]}</Text>
        ))}
        <Header>{isLogin ? "Email me my password" : ""}</Header>
        <PrimaryButton onPress={submitHandler}>
          {isLogin ? "Login" : "Create Account"}
        </PrimaryButton>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  emailPass: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
