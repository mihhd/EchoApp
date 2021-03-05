import React, { useContext } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import * as SQLite from "expo-sqlite";

import colors from "../config/colors";
import AppText from "./AppText";
import { useNavigation } from "@react-navigation/native";
import { assetsItems } from "../config/assetsItems";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppContext from "../context/appContext";

const db = SQLite.openDatabase("echoDB.db");

function Item({ item, setHeaderTitle, editMode, editItem }) {
  const [sound, setSound] = React.useState();
  const navigation = useNavigation();
  const appContext = useContext(AppContext);

  async function playSound() {
    try {
      if (appContext.settings.language === "en") {
        const { sound } = await Audio.Sound.createAsync(
          item.sound.startsWith("file")
            ? { uri: item.sound }
            : assetsItems.find((i) => i.name_mk === item.name_mk).sound_en
        );
        setSound(sound);
        await sound.playAsync();
      } else {
        const { sound } = await Audio.Sound.createAsync(
          item.sound.startsWith("file")
            ? { uri: item.sound }
            : assetsItems.find((i) => i.name_en === item.name_en).sound_mk
        );
        setSound(sound);
        await sound.playAsync();
      }
    } catch (error) {
      console.log("No sound + " + error);
    }
  }

  function itemTouched() {
    if (editMode) {
      editItem(item);
    } else {
      playSound();

      if (item.sound != null) {
        appContext.settings.language === "en"
          ? setHeaderTitle(item.name_en)
          : setHeaderTitle(item.name_mk);
      }

      if (item.is_category == 1) {
        var sqlQuery = `select id, name_en, name_mk, image, sound_${appContext.settings.language} as sound, category, is_category from items where category = "${item.name_en}"`;
        selectCategoryItems(sqlQuery).then((results) =>
          navigateToCategory(results)
        );
      }
    }
  }

  async function selectCategoryItems(sqlQuery) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(sqlQuery, [], (_, { rows: { _array } }) => {
          resolve(_array);
        });
      });
    });
  }

  function navigateToCategory(results) {
    navigation.navigate("Category", {
      items: results,
      categoryName: item.name_en,
    });
  }

  React.useEffect(() => {
    return sound
      ? () => {
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
        <AppText style={styles.text}>
          {appContext.settings.language === "en" ? item.name_en : item.name_mk}
        </AppText>
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
    width: "70%",
    height: "70%",
  },
  text: {
    color: colors.primary,
  },
});

export default Item;
