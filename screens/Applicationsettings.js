import { StyleSheet, View } from "react-native";
import Header from "../components/Header";
import { theme } from "../utils/theme";
import ApplicationButton from "../components/ApplicationButton";

function Applicationsettings() {
  return (
    <View style={styles.container}>
      <Header>Application Settings</Header>

      <View style={styles.list}>
        <ApplicationButton />
      </View>
    </View>
  );
}

export default Applicationsettings;

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
