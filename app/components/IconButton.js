import React from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";

function IconButton({ name, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons name={name} color={colors.light} size={34} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default IconButton;
