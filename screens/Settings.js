import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { theme } from "../utils/theme";
import SecondaryButton from "../components/SecondaryButton";
import Button from "../components/Button";

function Settings() {
  return (
    <View style={styles.container}>
      <Header>My Account</Header>
      <Text style={styles.username}>z</Text>

      <View style={styles.list}>
        <Button />
      </View>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    // paddingTop: 50,
    paddingHorizontal: 25,
    paddingVertical: 50,
  },
  username: {
    fontSize: 16,
  },
  buttonContainer: {
    // flex: 1,
    backgroundColor: "red",
    borderRadius: 12,
    height: 50,
    borderWidth: 1,
    borderColor: "yellow",
  },
  list: {
    marginTop: 20,
  }
});
