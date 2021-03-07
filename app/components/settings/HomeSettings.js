import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Screen from "../Screen";
import SettingsItem from "../SettingsItem";
import AppContext from "../../context/appContext";

function HomeSettings() {
  //set content language; this approach should be changed in the future
  const appContext = useContext(AppContext);

  const [textGeneral, setTextGeneral] = useState("");
  const [textLayout, setTextLayout] = useState("");
  const [textSupport, setextSupport] = useState("");
  const [textAbout, setTextAbout] = useState("");
  const [textDonate, setTextDonate] = useState("");

  useEffect(() => {
    if (appContext.settings.language === "mk") {
      setTextGeneral("Општо");
      setTextLayout("Изглед");
      setextSupport("Поддршка");
      setTextAbout("За нас");
      setTextDonate("Донации");
    } else {
      setTextGeneral("General");
      setTextLayout("View and Layout Settings");
      setextSupport("Support");
      setTextAbout("About");
      setTextDonate("Donate");
    }
  }, [appContext.settings.language]);

  /////////////////////////////////////////////////////////////

  return (
    <Screen>
      <View style={styles.container}>
        <SettingsItem
          name={"wrench-outline"}
          title={textGeneral}
          screen={"General"}
        />

        <SettingsItem
          name={"palette-outline"}
          title={textLayout}
          screen={"Layout"}
        />

        <SettingsItem
          name={"account-multiple-outline"}
          title={textSupport}
          screen={"Support"}
        />

        <SettingsItem
          name={"information-outline"}
          title={textAbout}
          screen={"About"}
        />

        <SettingsItem
          name={"currency-usd"}
          title={textDonate}
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
