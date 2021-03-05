import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "./IconButton";

function SettingsHeader({ root }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <IconButton
        name={"view-grid-plus-outline"}
        onPress={() =>
          navigation.navigate("AddEdit", { isCategory: false, root: root })
        }
      />

      {root === "Home" && (
        <IconButton
          name={"wallet-plus-outline"}
          onPress={() =>
            navigation.navigate("AddEdit", { isCategory: true, root: root })
          }
        />
      )}

      <IconButton
        name={"cogs"}
        onPress={() => {
          navigation.navigate("Settings");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default SettingsHeader;
