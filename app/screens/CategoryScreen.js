import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import EditButton from "../components/EditButton";
import IconButton from "../components/IconButton";
import Item from "../components/Item";
import Screen from "../components/Screen";
import SettingsHeader from "../components/SettingsHeader";
import colors from "../config/colors";
import MainContext from "../context/mainContext";

function CategoryScreen({ route }) {
  const mainContext = useContext(MainContext);
  const navigation = useNavigation();
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    setItems(route.params.items);
  }, [items]);

  React.useLayoutEffect(() => {
    initialHeader();
  }, []);

  function initialHeader() {
    navigation.setOptions({
      title: mainContext.title,
      headerLeft: () => <EditButton onPress={() => settingsHeader()} />,
      headerRight: () => (
        <View style={{ marginLeft: 10 }}>
          <IconButton name={"arrow-left"} onPress={handleGoBack} />
        </View>
      ),
    });
  }

  function handleGoBack() {
    mainContext.setTitle("");
    navigation.goBack();
  }

  function settingsHeader() {
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
      console.log("pogolemo");

      newTitle = newTitle.split(" ").splice(-4).join(" ");
    }
    console.log(newTitle);
    mainContext.setTitle(newTitle);
    navigation.setOptions({
      title: newTitle,
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
          renderItem={({ item }) => (
            <Item item={item} setHeaderTitle={setHeaderTitle} />
          )}
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

export default CategoryScreen;
