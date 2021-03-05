import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";

function WelcomeScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Hello</Text>
        <Text style={styles.subTitle}>Welcome to Echo</Text>
        <Image style={styles.image} source={require("../assets/welcome.png")} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 20,
  },
  title: {
    fontSize: 80,
    color: colors.white,
  },
  subTitle: {
    fontSize: 28,
    color: colors.white,
  },
  image: {
    top: 50,
  },
});

export default WelcomeScreen;
