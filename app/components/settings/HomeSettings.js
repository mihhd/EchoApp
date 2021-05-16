import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Screen from "../Screen";
import SettingsItem from "../SettingsItem";
import AppContext from "../../context/appContext";

function HomeSettings() {
  const { localization } = useContext(AppContext);

  return (
    <Screen>
      <View style={styles.container}>
        <SettingsItem
          name={"wrench-outline"}
          title={localization.t("settings_text_general")}
          screen={"General"}
        />

        <SettingsItem
          name={"palette-outline"}
          title={localization.t("settings_text_layout")}
          screen={"Layout"}
        />

        <SettingsItem
          name={"account-multiple-outline"}
          title={localization.t("settings_text_support")}
          screen={"Support"}
        />

        <SettingsItem
          name={"information-outline"}
          title={localization.t("settings_text_about")}
          screen={"About"}
        />

        <SettingsItem
          name={"currency-usd"}
          title={localization.t("settings_text_donate")}
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
