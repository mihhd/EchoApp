import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

function SettingsItem({ name, title, screen }) {
  const navigation = useNavigation();

  function navigateTo() {
    navigation.navigate(screen);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={navigateTo}>
      <MaterialCommunityIcons
        name={name}
        size={48}
        color={colors.white}
        style={styles.icon}
      />
      <AppText style={styles.text}>{title}</AppText>
      <View style={styles.right}>
        <MaterialCommunityIcons
          name="chevron-right"
          color={colors.white}
          size={40}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.medium,
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: colors.white,
  },
  icon: {
    marginRight: 15,
  },
  right: { flex: 1, alignItems: "flex-end", marginRight: 10 },
});

export default SettingsItem;
