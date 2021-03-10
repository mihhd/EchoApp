import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LanguageScreen from "../screens/LanguageScreen";
import CharacterScreen from "../screens/CharacterScreen";

const Stack = createStackNavigator();
function WelcomeNavigator(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="Character" component={CharacterScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default WelcomeNavigator;
