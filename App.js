import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FillData from "./app/config/FillData";
import AddEditScreen from "./app/screens/AddEditScreen";
import CharacterScreen from "./app/screens/CharacterScreen";
import HomeScreen from "./app/screens/HomeScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import * as SQLite from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./app/navigation/MainNavigator";
import navigationTheme from "./app/navigation/navigationTheme";

const db = SQLite.openDatabase("echoDB.db");

export default function App() {
  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        // "drop table items"
        "create table if not exists items (id integer primary key not null, name text not null, image text not null, sound text, category text not null, is_category not null);"
      );
    });
  }, []);

  return (
    <NavigationContainer theme={navigationTheme}>
      <MainNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
