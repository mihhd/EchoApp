import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import AddEditScreen from "../screens/AddEditScreen";
import colors from "../config/colors";
import MainContext from "../context/mainContext";
import SettingsNavigator from "./SettingsNavigator";

const Stack = createStackNavigator();
const APPBAR_HEIGHT = Platform.select({
  ios: 100,
  android: 100,
  default: 100,
});

function MainNavigator() {
  const [title, setTitle] = useState("");

  return (
    <MainContext.Provider value={{ title, setTitle }}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
            height: APPBAR_HEIGHT,
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="Home"
          options={{ title: "" }}
          component={HomeScreen}
        />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="AddEdit" component={AddEditScreen} />
        <Stack.Screen
          name="Settings"
          options={{ headerShown: false }}
          component={SettingsNavigator}
        />
      </Stack.Navigator>
    </MainContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default MainNavigator;
