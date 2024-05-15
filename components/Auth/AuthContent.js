import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthForm from "./AuthForm";
import Colors from "../../constants/colors";
import Header from "../Header";
import FlatButton from "../UI/Buttons/FlatButton";
import PrimaryButton from "../PrimaryButton";

import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Popup from '../Popup';

const BASE_URL = config; 

function AuthContent({ isLogin }) {
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup
  const [popupContent, setPopupContent] = useState({ title: '', message: '' }); // State to manage the content of the popup
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    fullname: false,
    email: false,
    password: false,
  });


  const switchAuthModeHandler = () => {
    if (isLogin) {
      navigation.navigate("SignupScreen");
    } else {
      navigation.navigate("LoginScreen");
    }
  };

  // Function to store authentication token securely
  const storeAuthToken = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      // Show success popup
      setPopupContent({ title: 'Success', message: 'Authentication token stored successfully.' });
      setShowPopup(true);
    } catch (error) {
      console.error("Error storing token:", error);
      // Show error popup
      setPopupContent({ title: 'Error', message: 'Something went wrong while storing the token.' });
      setShowPopup(true);
    }
  };
  
  const submitHandler = async (credentials) => {
    let { fullname, email, password } = credentials;
    // Trim input values
    fullname = fullname?.trim();
    email = email?.trim();
    password = password?.trim();
  
    try {
      const response = await fetch(`${BASE_URL}/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isLogin ? { email, password } : { fullname, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Upon successful authentication, store the authentication token securely
        storeAuthToken(data.token);
        if (isLogin) {
          navigation.navigate('AuthenticatedStack');
        } else {
          Alert.alert('Account Created', "We've sent a confirmation email to the address entered. Please activate your account.");
          navigation.navigate('Welcome');
        }
      } else {
        // Handle other errors (e.g., incorrect password)
        if (response.status === 401) {
          Alert.alert('Incorrect Password', 'The password entered does not match our records. Please check it and try again.');
        } else {
          Alert.alert('Error', 'Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      // Handle network errors
      if (error.message === 'Network request failed') {
        Alert.alert('Network Error', 'Please check your internet connection and try again.');
      } else {
        // Handle other errors
        console.error(error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
      console.log('URL:', `${BASE_URL}/${isLogin ? 'login' : 'register'}`);
      console.log('Credentials:', isLogin ? { email, password } : { fullname, email, password });
    }
  };
  

  // const submitHandler = async (credentials) => {
  //   if (error instanceof TypeError && error.message === 'Network request failed') {
  //     // Handle network errors
  //     Alert.alert('Network Error', 'Please check your internet connection and try again.');
  //   } else {
  //     // Handle other errors (e.g., incorrect password)
  //     Alert.alert('Error', 'Something went wrong. Please try again.');
  //   }

  //   storeAuthToken(responseData.token);

  //   let { fullname, email, password } = credentials;
    
  //   fullname = fullname?.trim();
  //   email = email?.trim();
  //   password = password?.trim();

  //   if (fullname !== undefined && fullname !== null) {
  //     fullname = fullname.trim();
  //   }
  //   if (email !== undefined && email !== null) {
  //     email = email.trim();
  //   }
  //   if (password !== undefined && password !== null) {
  //     password = password.trim();
  //   }  

    
  //   try {
  //     const response = await fetch(`${BASE_URL}/${isLogin ? 'login' : 'register'}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(isLogin ? { email, password } : { fullname, email, password }), // Use fullname instead of name
  //     });
  //     const data = await response.json();
  //     if (data.success) {
  //       if (isLogin) {
  //         navigation.navigate('AuthenticatedStack');
  //       } else {
  //         Alert.alert('Account Created', "We've sent a confirmation email to the address entered. Please activate your account.");
  //         navigation.navigate('Welcome');
  //       }
  //     } else {
  //       if (isLogin) {
  //         Alert.alert('Incorrect Password', 'The password entered does not match our records. Please check it and try again.');
  //       } else {
  //         Alert.alert('Username taken', 'Please choose a different username.');
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert('Error', 'Something went wrong. Please try again.');

  //     console.log('URL:', `${BASE_URL}/${isLogin ? 'login' : 'register'}`);
  //     console.log('Credentials:', isLogin ? { email, password } : { fullname, email, password });
  //   }
  // Upon successful authentication, store the authentication token securely



  

  return (
    <View style={styles.rootScreen}>
      <Header style={styles.login}>Skip Login</Header>
      <Header style={styles.headerText}>
        {isLogin ? "Access your account" : "Save preferences, get notifications"}
      </Header>
      <View style={styles.authContent}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.bottomContainer}>
          <PrimaryButton onPress={switchAuthModeHandler}>
            {isLogin ? "No account yet? Create one now" : "Already have an account. Log In"}
          </PrimaryButton>
        </View>
      </View>
      {/* Render NewAlert component if used */}
      {showPopup && (
        <Popup
          title={popupContent.title}
          message={popupContent.message}
          onClose={() => setShowPopup(false)} 
        />
      )}
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  login: {
    alignItems: "flex-end",
    marginTop: 60,
    marginHorizontal: 16,
  },
  headerText: {
    marginTop: 50,
    marginHorizontal: 16,
  },
  authContent: {
    flex: 1,
    marginTop: 35,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary300,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bottomText: {
    color: "white",
    fontSize: 16,
    fontFamily: "gilroy",
  },
});


