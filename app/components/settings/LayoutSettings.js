import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../AppText";
import Screen from "../Screen";
import SettingsBackButton from "./SettingsBackButton";
import { Picker } from "@react-native-picker/picker";
import colors from "../../config/colors";

function LayoutSettings(props) {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("Yes");

  React.useLayoutEffect(() => {
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
          <AppText style={styles.text}>Name below Symbol</AppText>
          <View style={styles.picker}>
            <Picker
              mode={"dropdown"}
              selectedValue={selectedValue}
              style={styles.dropdown}
              itemStyle={{ height: 44 }}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Yes" value="yes" />
              <Picker.Item label="No" value="no" />
            </Picker>
          </View>
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
