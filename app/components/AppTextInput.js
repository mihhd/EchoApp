import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function AppTextInput({ width = "60%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput
        placeholderTextColor={colors.brown}
        style={styles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "nowrap",
    borderBottomColor: colors.brown,
    borderBottomWidth: 2,
    flexDirection: "row",
    padding: 5,
  },
});

export default AppTextInput;
