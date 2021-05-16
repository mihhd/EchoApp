import React, { useContext } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Screen from "../components/Screen";
import Separator from "../components/Separator";
import colors from "../config/colors";
import AppContext from "../context/appContext";

import { useNavigation } from "@react-navigation/native";

function LanguageScreen() {
  const { localization } = useContext(AppContext);
  const navigation = useNavigation();

  function selectLanguage(language) {
    localization.setLocale(language);
    navigation.navigate("Character", { language: language });
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.text}>Choose a Language</Text>
        <Separator />
        <Text style={styles.text}>Одбери Јазик</Text>
        <View style={styles.languages}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => selectLanguage("en")}>
              <Image
                style={styles.circle}
                source={require("../assets/iconblocks/enflag.png")}
              />
              <Text style={styles.text}>English</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => selectLanguage("mk")}>
              <Image
                style={styles.circle}
                source={require("../assets/iconblocks/mkdflag.png")}
              />
              <Text style={styles.text}>Македонски</Text>
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
