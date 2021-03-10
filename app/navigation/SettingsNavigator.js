import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import About from "../components/settings/About";
import Donate from "../components/settings/Donate";
import GeneralSettings from "../components/settings/GeneralSettings";
import HomeSettings from "../components/settings/HomeSettings";
import LayoutSettings from "../components/settings/LayoutSettings";
import Support from "../components/settings/Support";
import colors from "../config/colors";

const APPBAR_HEIGHT = Platform.select({
  ios: 100,
  android: 100,
  default: 100,
});
const Stack = createStackNavigator();

function SettingsNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.light,
          height: APPBAR_HEIGHT,
        },
        headerTitleAlign: "center",
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen name="Settings" component={HomeSettings} />
      <Stack.Screen
        name="General"
        options={{ title: "General Settings" }}
        component={GeneralSettings}
      />
      <Stack.Screen
        name="Layout"
        options={{ title: "View and Layout" }}
        component={LayoutSettings}
      />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Donate" component={Donate} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SettingsNavigator;
