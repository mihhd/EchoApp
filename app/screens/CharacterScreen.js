import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import Separator from "../components/Separator";
import colors from "../config/colors";
import Screen from "../components/Screen";
import Character from "../components/Character";
import CustomModal from "../components/CustomModal";
import { useContext } from "react";
import AppContext from "../context/appContext";

const characters = [
  {
    id: 1,
    image: require("../assets/i.png"),
  },
  {
    id: 2,
    image: require("../assets/i1.png"),
  },
  {
    id: 3,
    image: require("../assets/i2.png"),
  },
  {
    id: 4,
    image: require("../assets/i3.png"),
  },
  {
    id: 5,
    image: require("../assets/i4.png"),
  },
  {
    id: 6,
    image: require("../assets/i5.png"),
  },
];

function CharacterScreen({ route }) {
  const appContext = useContext(AppContext0);

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  function chooseCharacter(image) {
    appContext.setSettings({
      language: route.params.language,
      character: image,
      pin: "0000",
      first_fun: 0,
    });

    console.log(appContext.settings);
  }

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.center}>
          <AppText style={styles.title}>Choose a Character</AppText>
          <Separator />
        </View>

        <FlatList
          data={characters}
          keyExtractor={(character) => character.id.toString()}
          numColumns="3"
          columnWrapperStyle={styles.columnWrapper}
          style={styles.flatList}
          renderItem={({ item }) => (
            <Character chooseCharacter={chooseCharacter} image={item.image} />
          )}
        />

        {image && (
          <View style={[styles.center, { marginTop: -20 }]}>
            <Character
              chooseCharacter={chooseCharacter}
              image={{ uri: image }}
            />
          </View>
        )}

        <View style={styles.center}>
          <Separator />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <AppText style={styles.buttonText}>Make your own</AppText>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="plus"
                color={colors.white}
                size={28}
              />
            </View>
          </TouchableOpacity>
          <CustomModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setImage={setImage}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    paddingTop: 100,
  },
  title: {
    fontSize: 28,
    color: colors.primary,
  },
  button: {
    height: 70,
    backgroundColor: colors.primary,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.medium,
    flexDirection: "row",
    padding: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 28,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
  },
  center: {
    alignItems: "center",
  },
  flatList: {
    flexGrow: 0,
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    backgroundColor: colors.secondary,
    borderColor: colors.medium,
    borderRadius: 50,
    margin: 5,
    padding: 5,
  },
  modal: {
    height: 200,
  },
});

export default CharacterScreen;
