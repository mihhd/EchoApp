import React, { useState } from "react";
import { StyleSheet } from "react-native";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import * as SQLite from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./app/navigation/MainNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import { assetsItems } from "./app/config/assetsItems";
import WelcomeNavigator from "./app/navigation/WelcomeNavigator";
import AppContext from "./app/context/appContext";

import logger from "./app/utility/logger";
logger.start();

const db = SQLite.openDatabase("echoDB.db");

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [firstRun, setFirstRun] = useState(true);
  const [settings, setSettings] = useState();

  executeSql = async (sql, params = []) => {
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          sql,
          params,
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, _error) => {
            console.log("ERROR " + sql + " err: " + _error);
            reject;
          }
        );
      })
    );
  };

  createTableItems = async () => {
    executeSql(
      "create table if not exists items (id integer primary key not null, name_en text not null, name_mk text not null, image text not null, sound_en text, sound_mk text, category text not null, is_category not null);"
    ).then(selectItems());
  };

  function selectItems() {
    executeSql("select * from items").then((items) => insertItems(items));
  }

  insertItems = async (items) => {
    if (items.length === 0) {
      for (const item of assetsItems) {
        await executeSql(
          "insert into items (name_en, name_mk, image, sound_en, sound_mk, category, is_category) values (?, ?, ?, ?, ?, ?, ?)",
          [
            item.name_en,
            item.name_mk,
            item.image,
            item.sound_en,
            item.sound_mk,
            item.category,
            item.is_category,
          ]
        );
      }
    }
  };

  createTableSettings = async () => {
    executeSql(
      "create table if not exists settings (id integer primary key not null, language text not null, character text not null, show_name not null, first_run not null);"
    ).then(selectSettings());
  };

  function selectSettings() {
    executeSql("select * from settings").then((sets) => {
      if (sets.length > 0) {
        setSettings(sets[0]);
        setFirstRun(false);
      } else {
        setFirstRun(true);
      }
    });
  }

  function timeout() {
    setTimeout(() => {
      setIsReady(true);
    }, 2000);
  }

  function dropTableItems() {
    executeSql("drop table items").then(executeSql("drop table settings"));
  }

  React.useLayoutEffect(() => {
    Promise.all([createTableItems(), createTableSettings()]).then(() =>
      timeout()
    );
  }, []);

  return (
    <>
      {isReady ? (
        <AppContext.Provider
          value={{ settings, setSettings, firstRun, setFirstRun }}
        >
          <NavigationContainer theme={navigationTheme}>
            {firstRun ? <WelcomeNavigator /> : <MainNavigator />}
          </NavigationContainer>
        </AppContext.Provider>
      ) : (
        <WelcomeScreen />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#aabbcc",
  },
});
