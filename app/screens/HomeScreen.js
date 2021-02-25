import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Item from "../components/Item";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import EditButton from "../components/EditButton";
import SettingsHeader from "../components/SettingsHeader";
import IconButton from "../components/IconButton";
import { useEffect } from "react";
import { useContext } from "react";
import MainContext from "../context/mainContext";
import EditModal from "../components/EditModal";
import { TouchableOpacity } from "react-native-gesture-handler";

const db = SQLite.openDatabase("echoDB.db");
const imagesDir = FileSystem.documentDirectory + "images/";
const soundsDir = FileSystem.documentDirectory + "sounds/";

function HomeScreen() {
  const mainContext = useContext(MainContext);
  const [items, setItems] = useState(null);
  const [editMode, setEditMode] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState();

  const navigation = useNavigation();

  function selectItems() {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from items where category = "Home";`,
        [],
        (_, { rows: { _array } }) => {
          setItems(_array);
        },
        () => console.log("kurac")
      );
    });
  }

  useEffect(() => {
    selectItems();
  }, [items]);

  useLayoutEffect(() => {
    initialHeader();
  }, []);

  useEffect(() => {
    if (mainContext.title === "") {
      navigation.setOptions({ title: "", headerRight: () => <View /> });
    }
  }, [mainContext.title]);

  function removeTitle() {
    mainContext.setTitle("");
  }

  function initialHeader() {
    setEditMode(false);
    mainContext.setTitle("");
    navigation.setOptions({
      headerRight: () => <View />,
      headerLeft: () => <EditButton onPress={() => settingsHeader()} />,
    });
  }

  function settingsHeader() {
    setEditMode(true);
    navigation.setOptions({
      title: "",
      headerRight: () => (
        <View>
          <SettingsHeader root={"Home"} />
        </View>
      ),
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <IconButton name={"arrow-left"} onPress={initialHeader} />
        </View>
      ),
    });
  }

  function setHeaderTitle(addTitle) {
    if (addTitle === mainContext.title.split(" ").pop()) {
      return;
    }

    var newTitle = mainContext.title + " " + addTitle;
    if (newTitle.split(" ").length > 4) {
      console.log("pogolemo");

      newTitle = newTitle.split(" ").splice(-4).join(" ");
    }
    mainContext.setTitle(newTitle);
    navigation.setOptions({
      title: newTitle,
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 50, marginTop: 5 }}
          onPress={removeTitle}
        >
          <MaterialCommunityIcons name="close" size={15} color={colors.light} />
        </TouchableOpacity>
      ),
    });
  }

  function editItem(item) {
    setItemToEdit(item);
    setModalVisible(true);
  }

  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          numColumns="3"
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <Item
              item={item}
              setHeaderTitle={setHeaderTitle}
              editMode={editMode}
              editItem={editItem}
            />
          )}
        />
      </View>
      <EditModal
        itemToEdit={itemToEdit}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
  },
});

// Empty document directory

// FileSystem.readDirectoryAsync(imagesDir).then((result) => {
//   console.log(result).catch((err) => console.log("error: " + err));
// });

// async function deleteAllGifs() {
//   console.log("Deleting all files...");
//   await FileSystem.deleteAsync(soundsDir);
//   await FileSystem.deleteAsync(imagesDir);
// }

export default HomeScreen;
