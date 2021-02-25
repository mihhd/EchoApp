import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import * as SQLite from "expo-sqlite";

import colors from "../config/colors";
import AppText from "./AppText";
import { useNavigation } from "@react-navigation/native";
import { assetsItems } from "../config/assetsItems";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const db = SQLite.openDatabase("echoDB.db");

function Item({ item, setHeaderTitle, editMode, editItem }) {
  const [sound, setSound] = React.useState();
  const navigation = useNavigation();

  async function playSound() {
    console.log("Loading Sound");
    try {
      const { sound } = await Audio.Sound.createAsync(
        item.sound.startsWith("file")
          ? { uri: item.sound }
          : assetsItems.find((i) => i.name === item.name).sound
      );
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } catch (error) {
      console.log("NE PEJ + " + error);
    }
  }

  function itemTouched() {
    if (editMode) {
      editItem(item);
    } else {
      playSound();

      if (item.sound != null) {
        setHeaderTitle(item.name);
      }

      if (item.is_category == 1) {
        selectCategoryItems().then((results) => navigateToCategory(results));
      }
    }
  }

  async function selectCategoryItems() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from items where category = ?;`,
          [item.name],
          (_, { rows: { _array } }) => {
            resolve(_array);
          }
        );
      });
    });
  }

  function navigateToCategory(results) {
    console.log(results);
    navigation.navigate("Category", {
      items: results,
      categoryName: item.name,
    });
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <TouchableOpacity onPress={() => itemTouched()}>
      {editMode && (
        <View style={styles.edit}>
          <MaterialCommunityIcons
            name="pencil-outline"
            size={25}
            color={colors.light}
          />
        </View>
      )}

      <View style={styles.container}>
        <Image
          source={
            item.image.startsWith("file") ? { uri: item.image } : item.image
          }
          style={styles.image}
        />
        <AppText style={styles.text}> {item.name} </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderColor: colors.medium,
    borderRadius: 15,
    borderWidth: 1,
    height: 110,
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 110,
    padding: 5,
  },
  edit: {
    alignSelf: "flex-end",
    borderRadius: 50,
    backgroundColor: "#babedf",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -25,
    marginRight: -5,
    zIndex: 15,
  },
  image: {
    width: "80%",
    height: "80%",
  },
  text: {
    color: colors.primary,
  },
});

export default Item;
