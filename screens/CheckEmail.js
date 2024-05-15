import React, { memo } from "react";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { emailValidator } from "../utils/utils";
import { theme } from "../utils/theme";
import SubText from "../components/SubText";
import Animation from "../components/Animation";

function CheckEmail() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);


  async function nextHandler() {
    setLoading(true);
    
    try {
      // Make an HTTP request to your server endpoint to verify the email
      const response = await fetch("https://your-server.com/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // You can pass any necessary data in the request body
        body: JSON.stringify({ email }),
      });

      // Parse the response JSON
      const data = await response.json();

      // If the response indicates success, navigate to the next screen
      if (response.ok) {
        navigation.navigate("SetPassword");
      } else {
        // If the response indicates failure, display an error message
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Set loading to false when the request is completed (whether successful or not)
      setLoading(false);
    }
  }

  return (
    <View style={styles.loginContainer}>
      <Animation />
      <View style={styles.contentContainer}>
      <Header>Your email will soon arrive</Header>
      <SubText>
        Check your email {email} and follow the instructions to reset your
        password
      </SubText>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextHandler} disabled={loading}>{loading ? "Verifying Email..." : "Continue"}</PrimaryButton>
        </View>
      </View>
    </View>
  );
};

export default CheckEmail;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
