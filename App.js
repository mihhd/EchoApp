import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AddEditScreen from "./app/screens/AddEditScreen";
import CharacterScreen from "./app/screens/CharacterScreen";
import HomeScreen from "./app/screens/HomeScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import * as SQLite from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./app/navigation/MainNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import { assetsItems } from "./app/config/assetsItems";
import LanguageScreen from "./app/screens/LanguageScreen";
import WelcomeNavigator from "./app/navigation/WelcomeNavigator";
import AppContext from "./app/context/appContext";

const db = SQLite.openDatabase("echoDB.db");

export default function App() {
  executeSql = async (sql, params = []) => {
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          sql,
          params,
          (_, { rows }) => {
            resolve(rows._array);
            console.log(sql + " OK");
          },
          () => {
            console.log("ERROR " + sql);
            reject;
          }
        );
      })
    );
  };

  createTableItems = async () => {
    await executeSql(
      "create table if not exists items (id integer primary key not null, name text not null, image text not null, sound text, category text not null, is_category not null);"
    );
  };

  function createTableSettings() {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, name text not null, image text not null, sound text, category text not null, is_category not null);"
      );
    });
  }

  insertItems = async (items) => {
    if (items.length === 0) {
      console.log(items.length);
      for (const item of assetsItems) {
        await executeSql(
          "insert into items (name, image, sound, category, is_category) values (?, ?, ?, ?, ?)",
          [item.name, item.image, item.sound, item.category, item.is_category]
        );
      }
    }
  };

  function selectItems() {
    executeSql("select * from items", []).then((items) => insertItems(items));
  }

  function dropTableItems() {
    executeSql("drop table items");
  }

  React.useLayoutEffect(() => {
    createTableItems();
    selectItems();
  }, []);

  const [settings, setSettings] = useState({
    language: "en",
    character: "I",
    pin: "0000",
    first_run: 1,
  });

  return (
    <AppContext.Provider value={{ settings, setSettings }}>
      <NavigationContainer theme={navigationTheme}>
        {settings.first_run ? <WelcomeNavigator /> : <MainNavigator />}
      </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
