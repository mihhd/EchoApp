import React, { useLayoutEffect, useState, useContext, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as SQLite from "expo-sqlite";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Item from "../components/Item";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import EditButton from "../components/EditButton";
import SettingsHeader from "../components/SettingsHeader";
import IconButton from "../components/IconButton";
import MainContext from "../context/mainContext";
import EditModal from "../components/EditModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppContext from "../context/appContext";

const db = SQLite.openDatabase("echoDB.db");

function HomeScreen() {
  const mainContext = useContext(MainContext);
  const [items, setItems] = useState(null);
  const [editMode, setEditMode] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState();

  const navigation = useNavigation();
  const appContext = useContext(AppContext);

  function selectItems(sqlQuery) {
    db.transaction((tx) => {
      tx.executeSql(
        sqlQuery,
        [],
        (_, { rows: { _array } }) => {
          setItems(_array);
        },
        (_, _error) => {
          console.log(_error);
        }
      );
    });
  }

  useEffect(() => {
    var sqlQuery = `select id, name_en, name_mk, image, sound_${appContext.settings.language} as sound, category, is_category from items where category = "Home"`;
    selectItems(sqlQuery);
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
        language={appContext.settings.language}
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

export default HomeScreen;
