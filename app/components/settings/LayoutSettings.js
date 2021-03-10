import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Screen from "../Screen";
import SettingsBackButton from "./SettingsBackButton";
import colors from "../../config/colors";
import SettingsDropdown from "./SettingsDropdown";
import AppContext from "../../context/appContext";

const options = [
  { key: 1, label: "Yes", value: 1 },
  { key: 0, label: "No", value: 0 },
];

function LayoutSettings() {
  const appContext = useContext(AppContext);

  const [textName, setTextName] = useState("");

  useEffect(() => {
    if (appContext.settings.language === "mk") {
      setTextName("Име под Симболот");
    } else {
      setTextName("Name below Symbol");
    }
  }, [appContext.settings.language]);

  const navigation = useNavigation();

  const [selectedValue, setSelectedValue] = useState(
    appContext.settings.show_name
  );

  useEffect(() => {}, [selectedValue]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <SettingsBackButton onPress={setLayoutSettings} />,
    });
  }, [navigation]);

  function setLayoutSettings() {
    navigation.goBack();
  }

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>{textName}</Text>
          <SettingsDropdown
            options={options}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
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

export default LayoutSettings;
