import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Separator from "../components/Separator";
import colors from "../config/colors";
import Screen from "../components/Screen";
import Character from "../components/Character";
import CustomModal from "../components/CustomModal";
import { useContext } from "react";
import * as SQLite from "expo-sqlite";
import AppContext from "../context/appContext";
import { useEffect } from "react/cjs/react.development";

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

const db = SQLite.openDatabase("echoDB.db");

function CharacterScreen({ route }) {
  const appContext = useContext(AppContext);

  const [textCharacter, setTextCharacter] = useState("");
  const [textOwn, setTextOwn] = useState("");

  useEffect(() => {
    if (route.params.language === "mk") {
      setTextCharacter("Изберете карактер");
      setTextOwn("Изберете ваш");
    } else {
      setTextCharacter("Choose a Character");
      setTextOwn("Make your own");
    }
  }, [appContext.language]);

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [toCamera, setToCamera] = useState(false);

  updateCharacter = async (img) => {
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          "update items set image = ? where id = 1",
          [img],
          () => resolve(),
          (_, error) => reject(error)
        );
      })
    );
  };

  insertSettings = async (img) => {
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          "insert into settings (language, character, show_name, first_run) values (?, ?, ?, ?)",
          [route.params.language, img, 1, 0]
        );
        tx.executeSql(
          "select * from settings",
          [],
          (_, { rows }) => {
            resolve(rows._array[0]);
          },
          (_, _error) => {
            console.log(_error);
            reject;
          }
        );
      })
    );
  };

  function chooseCharacter(img) {
    const upDate = updateCharacter(img);
    const insert = insertSettings(img);
    Promise.all([upDate, insert])
      .then((settings) => {
        appContext.setSettings(settings[1]);
        appContext.setFirstRun(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.title}>{textCharacter}</Text>
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
            onPress={() => {
              setModalVisible(true);
              setToCamera(false);
            }}
          >
            <Text style={styles.buttonText}>{textOwn}</Text>
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
            toCamera={toCamera}
            setToCamera={setToCamera}
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
