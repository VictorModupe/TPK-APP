import { StyleSheet, Text, TextInput, View } from "react-native";

import Colors from "../../constants/colors";

//Input components takes the following props to render the input field that has the text label

function Input({
  label, //Text Label
  keyboardType, //Keyboard type for the input field
  secure,       //Bolean that indicates whether the input is masked to protect sensitive information
  placeholder,  //placeholder to display if input field is empty
  onUpdateValue, //this function is called if the input field value changes
  value,         //current value of the input field
  isInvalid,      //Boolean indicates whether the input is in valid or invalid
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoCapitalize="none"
        secureTextEntry={secure}
        style={[styles.input, isInvalid && styles.inputInvalid]}
        value={value}
        onChangeText={onUpdateValue}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 25,
  },
  label: {
    color: "white",
    marginBottom: 10,
    fontFamily: "gilroy",
  },
  input: {
    // paddingVertical: 8,
    // paddingHorizontal: 6,
    padding: 20,
    backgroundColor: Colors.primary100,
    borderRadius: 2,
    fontSize: 16,
    fontFamily: "gilroy",
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
  labelInvalid: {
    color: Colors.error500,
  },
});
