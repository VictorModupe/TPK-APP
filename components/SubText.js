import { View, Text, StyleSheet } from "react-native";

function SubText({ children }) {
  return (
    <View>
      <Text style={[styles.subText]}>{children}</Text>
    </View>
  );
}

export default SubText;

const styles = StyleSheet.create({
  subText: {
    color: "#000",
    fontSize: 19,
    // fontWeight: "500",
  },
});
