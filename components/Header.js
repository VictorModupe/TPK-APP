import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../utils/theme";

function Header({ children }) {
  return (
    <View>
      <Text style={styles.header}>{children}</Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 10,
  },
});
