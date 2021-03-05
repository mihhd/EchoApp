import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import Separator from "../components/Separator";
import colors from "../config/colors";

import { useNavigation } from "@react-navigation/native";

function LanguageScreen() {
  const navigation = useNavigation();

  function selectLanguage(language) {
    navigation.navigate("Character", { language: language });
  }

  return (
    <Screen>
      <View style={styles.container}>
        <AppText style={styles.text}>Choose a Language</AppText>
        <Separator />
        <AppText style={styles.text}>Одбери Јазик</AppText>
        <View style={styles.languages}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => selectLanguage("en")}>
              <Image
                style={styles.circle}
                source={require("../assets/iconblocks/enflag.png")}
              />
              <AppText style={styles.text}>English</AppText>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => selectLanguage("mk")}>
              <Image
                style={styles.circle}
                source={require("../assets/iconblocks/mkdflag.png")}
              />
              <AppText style={styles.text}>Македонски</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
  },
  text: {
    fontSize: 24,
    color: colors.primary,
  },
  languages: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 100,
  },
  circle: {
    alignSelf: "center",
  },
});

export default LanguageScreen;
