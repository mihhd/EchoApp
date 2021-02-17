import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Item from "../components/Item";
import Screen from "../components/Screen";
import SettingsHeader from "../components/SettingsHeader";
import colors from "../config/colors";

function CategoryScreen({ route }) {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    settingsHeader();
  }, [navigation]);

  function settingsHeader() {
    navigation.setOptions({
      title: "",
      headerRight: () => <SettingsHeader root={route.params.categoryName} />,
    });
  }
  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          data={route.params.items}
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

export default CategoryScreen;
