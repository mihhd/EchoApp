import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Screen } from "react-native-screens";
import colors from "../../config/colors";
import AppContext from "../../context/appContext";
import SettingsBackButton from "./SettingsBackButton";
import SettingsDropdown from "./SettingsDropdown";

const languageOptions = [
  { key: "en", label: "English", value: "en" },
  { key: "mk", label: "Македонски", value: "mk" },
];

function GeneralSettings() {
  const appContext = useContext(AppContext);

  const [textLanguage, setTextLanguage] = useState("");

  useEffect(() => {
    if (appContext.settings.language === "mk") {
      setTextLanguage("Јазик");
    } else {
      setTextLanguage("Language");
    }
  }, [appContext.settings.language]);

  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    appContext.settings.language
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <SettingsBackButton onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>{textLanguage}</Text>
          <SettingsDropdown
            options={languageOptions}
            selectedValue={selectedLanguage}
            setSelectedValue={setSelectedLanguage}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.medium,
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: colors.white,
  },
  picker: {
    width: 150,
    borderWidth: 3,
    borderColor: colors.medium,
  },
});

export default GeneralSettings;
