import { StyleSheet, View } from "react-native";
import Header from "../components/Header";
import AccountButton from "../components/AccountButton";
import { theme } from "../utils/theme";

function Accountsettings() {
  return (
    <View style={styles.container}>
      <Header>Account Settings</Header>

      <View style={styles.list}>
        <AccountButton />
      </View>
    </View>
  );
}

export default Accountsettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    // paddingTop: 50,
    paddingHorizontal: 25,
    paddingVertical: 50,
  },
  list: {
    marginTop: 20,
  },
});
