import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Screen from "../Screen";
import SettingsItem from "../SettingsItem";

function HomeSettings(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <SettingsItem
          name={"wrench-outline"}
          title={"General"}
          screen={"General"}
        />

        <SettingsItem
          name={"palette-outline"}
          title={"View and Layout Settings"}
          screen={"Layout"}
        />

        <SettingsItem
          name={"account-multiple-outline"}
          title={"Support"}
          screen={"Support"}
        />

        <SettingsItem
          name={"information-outline"}
          title={"About"}
          screen={"About"}
        />

        <SettingsItem
          name={"currency-usd"}
          title={"Donate"}
          screen={"Donate"}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
});

export default HomeSettings;
