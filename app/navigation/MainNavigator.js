import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import AddEditScreen from "../screens/AddEditScreen";
import colors from "../config/colors";

const Stack = createStackNavigator();
const APPBAR_HEIGHT = Platform.select({
  ios: 100,
  android: 100,
  default: 100,
});

const MainNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
        height: APPBAR_HEIGHT,
      },
      headerTintColor: "white",
    }}
  >
    <Stack.Screen name="Home" options={{ title: "" }} component={HomeScreen} />
    <Stack.Screen name="Category" component={CategoryScreen} />
    <Stack.Screen name="AddEdit" component={AddEditScreen} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {},
});

export default MainNavigator;
