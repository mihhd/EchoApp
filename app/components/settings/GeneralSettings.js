import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Screen } from "react-native-screens";
import colors from "../../config/colors";
import AppContext from "../../context/appContext";
import AppText from "../AppText";
import SettingsBackButton from "./SettingsBackButton";
import { Picker } from "@react-native-picker/picker";
import AppTextInput from "../AppTextInput";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("echoDB.db");

function GeneralSettings(props) {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);

  const [selectedValue, setSelectedValue] = useState("en");
  const [pin, setPin] = useState();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <SettingsBackButton onPress={setGeneralSettings} />,
    });
  }, [navigation]);

  function setGeneralSettings() {
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
          <AppText style={styles.text}>Language</AppText>
          <View style={styles.picker}>
            <Picker
              mode={"dropdown"}
              selectedValue={selectedValue}
              style={styles.dropdown}
              itemStyle={{ height: 44 }}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Македонски" value="mk" />
            </Picker>
          </View>
        </View>
        <View style={styles.row}>
          <AppText style={styles.text}>Pin</AppText>
          <View style={styles.picker}>
            <AppTextInput
              style={styles.text}
              placeholder={appContext.settings.pin}
              width={"100%"}
              keyboardType={"numeric"}
              maxLength={4}
            ></AppTextInput>
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
  dropdown: {
    width: "100%",
    borderWidth: 1,
    color: colors.white,
    fontSize: 18,
  },
});

export default GeneralSettings;
