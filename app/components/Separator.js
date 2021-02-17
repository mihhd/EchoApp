import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

function Separator({ style }) {
  return (
    <View
      style={[
        {
          backgroundColor: style.color,
          width: style.width,
          margin: style.margin,
        },
        styles.separator,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
  },
});

export default Separator;
