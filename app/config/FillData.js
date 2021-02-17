import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";
import AppText from "../components/AppText";

const db = SQLite.openDatabase("echoDB.db");

const cells = [
  {
    id: 1,
    title: "I",
    price: 100,
    image: require("../assets/i.png"),
    sound: require("../assets/audio/i.mp3"),
    category: "home",
    isCategory: false,
  },
  {
    id: 2,
    title: "Apple",
    image: require("../assets/apple.png"),
    sound: require("../assets/audio/apple.mp3"),
    category: "home",
    isCategory: false,
  },
  {
    id: 3,
    title: "to play",
    image: require("../assets/toplay.png"),
    sound: require("../assets/audio/to_play.mp3"),
    category: "home",
    isCategory: true,
  },
  {
    id: 4,
    title: "Basketball",
    image: require("../assets/basketball.png"),
    sound: require("../assets/audio/basketball.mp3"),
    category: "to play",
    isCategory: false,
  },
];

function FillData(props) {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <AppText>EEEEEEEEEE</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default FillData;
