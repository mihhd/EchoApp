import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";

function AppButton({ title, onPress, fontSize }) {
  return (
    <TouchableOpacity style={styles.submit} onPress={onPress}>
      <Text style={[styles.text, fontSize]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submit: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  text: {
    color: colors.light,
    fontSize: 20,
  },
});

export default AppButton;
