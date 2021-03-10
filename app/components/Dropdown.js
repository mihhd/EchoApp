import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "../config/colors";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("echoDB.db");

function Dropdown({ selectedValue, setSelectedValue, root, language }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (root === "Home") {
      selectItems();
    } else {
      setItems([{ key: root, value: root, label: root }]);
    }
  }, []);

  function selectItems() {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from items where is_category='1'`,
        [],
        (_, { rows: { _array } }) => {
          var newArr = [];
          if (language === "mk") {
            newArr = _array.map((i) => ({
              key: i.name_en,
              value: i.name_en,
              label: i.name_mk,
            }));
          } else {
            newArr = _array.map((i) => ({
              key: i.name_en,
              value: i.name_en,
              label: i.name_en,
            }));
          }
          newArr.splice(0, 0, { key: "Home", value: "Home", label: "Home" });
          setItems(newArr);
        },
        () => console.log("dropdown kurac")
      );
    });
  }

  return (
    <View style={styles.container}>
      <Picker
        mode={"dropdown"}
        selectedValue={selectedValue}
        style={styles.dropdown}
        itemStyle={{ height: 44 }}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
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
