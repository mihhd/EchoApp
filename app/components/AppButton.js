import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import AppText from "./AppText";

function AppButton({ title, onPress, fontSize }) {
  return (
    <TouchableOpacity style={styles.submit} onPress={onPress}>
      <AppText style={[styles.text, fontSize]}>{title}</AppText>
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
