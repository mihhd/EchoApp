import React from "react";
import { View, StyleSheet, Image } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

function WelcomeScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <AppText style={styles.title}>Hello</AppText>
        <AppText style={styles.subTitle}>Welcome to Echo</AppText>
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
