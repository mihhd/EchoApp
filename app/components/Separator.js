import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "30%",
    backgroundColor: colors.medium,
    margin: 20,
  },
});

export default Separator;
