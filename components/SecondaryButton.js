import { View, Text, Pressable, StyleSheet } from "react-native";
import { theme } from '../utils/theme';

function SecondaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: theme.colors.accent }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: theme.colors.primary,
    textAlign: "center",
    // fontSize: 14
  },
  pressed: {
    opacity: 0.75,
  },
});
