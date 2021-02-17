import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../config/colors";

function Character({ image }) {
  return (
    <TouchableOpacity onPress={() => console.log("haaa")}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderColor: colors.medium,
    borderRadius: 15,
    borderWidth: 1,
    height: 110,
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 110,
    padding: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});

export default Character;
