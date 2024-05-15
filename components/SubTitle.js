import { View, Text, StyleSheet } from "react-native";

function SubTitle({ children }) {
  return (
    <View>
      <Text style={styles.subText}>{children}</Text>
    </View>
  );
}

export default SubTitle;

const styles = StyleSheet.create({
  subText: {
    color: "#000",
    fontSize: 16,
    // fontWeight: "500",
    textAlign: "center",
  },
});
