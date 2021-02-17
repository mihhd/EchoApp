import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

import Item from "../components/Item";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import EditButton from "../components/EditButton";
import SettingsHeader from "../components/SettingsHeader";
import IconButton from "../components/IconButton";

const db = SQLite.openDatabase("echoDB.db");
const imagesDir = FileSystem.documentDirectory + "images/";
const soundsDir = FileSystem.documentDirectory + "sounds/";

function HomeScreen() {
  const [items, setItems] = React.useState(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from items where category = "Home";`,
        [],
        (_, { rows: { _array } }) => setItems(_array),
        () => console.log("kurac")
      );
    });
  }, [items]);

  React.useLayoutEffect(() => {
    initialHeader();
  }, [navigation]);

  function initialHeader() {
    navigation.setOptions({
      title: "",
      headerLeft: () => <EditButton onPress={() => settingsHeader()} />,
      headerRight: () => <View />,
    });
  }

  function settingsHeader() {
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

  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          numColumns="3"
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => <Item item={item} />}
        />
      </View>
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
//   console.log("Deleting all GIF files...");
//   await FileSystem.deleteAsync(soundsDir);
//   await FileSystem.deleteAsync(imagesDir);
// }

export default HomeScreen;
