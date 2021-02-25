import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "../config/colors";
import { useEffect } from "react";
import { set } from "react-native-reanimated";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("echoDB.db");

function Dropdown({ selectedValue, setSelectedValue, root }) {
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
          var newArr = _array.map((i) => ({
            key: i.name,
            value: i.name,
            label: i.name,
          }));
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
