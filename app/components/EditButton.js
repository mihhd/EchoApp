import React from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

function EditButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons
        name="cog-outline"
        color={colors.light}
        size={34}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});

export default EditButton;
