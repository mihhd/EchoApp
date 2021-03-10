import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, FlatList } from "react-native";

import EditButton from "../components/EditButton";
import IconButton from "../components/IconButton";
import Item from "../components/Item";
import Screen from "../components/Screen";
import SettingsHeader from "../components/SettingsHeader";
import colors from "../config/colors";
import MainContext from "../context/mainContext";
import EditModal from "../components/EditModal";
import AppContext from "../context/appContext";

function CategoryScreen({ route }) {
  const appContext = useContext(AppContext);
  const mainContext = useContext(MainContext);
  const navigation = useNavigation();

  const [editMode, setEditMode] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState();

  React.useLayoutEffect(() => {
    initialHeader();
  }, []);

  function initialHeader() {
    setEditMode(false);

    navigation.setOptions({
      title: mainContext.title,
      headerLeft: () => (
        <EditButton
          settingsHeader={settingsHeader}
          language={appContext.settings.language}
        />
      ),
      headerRight: () => (
        <View style={{ marginLeft: 10 }}>
          <IconButton name={"backspace-outline"} onPress={handleGoBack} />
        </View>
      ),
    });
  }

  function handleGoBack() {
    mainContext.setTitle("");
    navigation.goBack();
  }

  function settingsHeader() {
    setEditMode(true);

    navigation.setOptions({
      title: "",
      headerRight: () => <SettingsHeader root={route.params.categoryName} />,
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
      newTitle = newTitle.split(" ").splice(-4).join(" ");
    }
    console.log(newTitle);
    mainContext.setTitle(newTitle);
    navigation.setOptions({
      title: newTitle,
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
          data={route.params.items}
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

export default CategoryScreen;
