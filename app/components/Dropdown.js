import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "../config/colors";

const items = [
  { key: "Luke Skywalker", label: "Luke Skywalker", value: "Luke Skywalker" },
  { key: "C-3PO", label: "C-3PO", value: "C-3PO" },
  { key: "R2-D2", label: "R2-D2", value: "R2-D2" },
  { key: "Home", label: "Home", value: "Home" },
  { key: "prva", label: "prva", value: "prva" },
];

function Dropdown({ selectedValue, setSelectedValue }) {
  return (
    <View style={styles.container}>
      <Picker
        mode={"dropdown"}
        selectedValue={selectedValue}
        style={styles.dropdown}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {items.map((item) => (
          <Picker.Item key={item.key} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.brown,
    borderBottomWidth: 2,
    width: "60%",
  },
  dropdown: {
    width: "100%",
    borderWidth: 1,
    color: colors.brown,
  },
});

export default Dropdown;
