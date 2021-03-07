import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import { Picker } from "@react-native-picker/picker";

function SettingsDropdown({ options, selectedValue, setSelectedValue }) {
  return (
    <View style={styles.picker}>
      <Picker
        mode={"dropdown"}
        selectedValue={selectedValue}
        style={styles.dropdown}
        itemStyle={{ height: 44 }}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        {options.map((option) => (
          <Picker.Item
            key={option.key}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default SettingsDropdown;
