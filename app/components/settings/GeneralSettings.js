import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Screen } from "react-native-screens";
import colors from "../../config/colors";
import AppContext from "../../context/appContext";
import SettingsBackButton from "./SettingsBackButton";
import * as SQLite from "expo-sqlite";
import SettingsDropdown from "./SettingsDropdown";
import { TextInput } from "react-native-gesture-handler";

const db = SQLite.openDatabase("echoDB.db");
const languageOptions = [
  { key: "en", label: "English", value: "en" },
  { key: "mk", label: "Македонски", value: "mk" },
];

function GeneralSettings({ route }) {
  const appContext = useContext(AppContext);

  const [textLanguage, setTextLanguage] = useState("");
  const [textPin, setTextPin] = useState("");

  useEffect(() => {
    if (appContext.settings.language === "mk") {
      setTextLanguage("Јазик");
      setTextPin("Пин");
    } else {
      setTextLanguage("Language");
      setTextPin("Pin");
    }
  }, [appContext.settings.language]);

  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    appContext.settings.language
  );
  const [pin, setPin] = useState(appContext.settings.pin);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <SettingsBackButton onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  function goBackWithCallback() {
    route.params.callback(selectedLanguage, pin);
    navigation.goBack();
  }

  async function updateGeneral() {
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          "update settings set language = ?, pin = ? where id = 1",
          [language, pin],
          () => resolve(),
          (_, error) => reject(error)
        );
      })
    );
  }

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
        <View style={styles.row}>
          <Text style={styles.text}>{textPin}</Text>
          <View style={styles.picker}>
            <TextInput
              style={styles.text}
              placeholder={appContext.settings.pin}
              width={"100%"}
              keyboardType={"numeric"}
              maxLength={4}
              onChangeText={(text) => setPin(text)}
            ></TextInput>
          </View>
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
