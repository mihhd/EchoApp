import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

import colors from "../config/colors";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import Screen from "../components/Screen";
import Dropdown from "../components/Dropdown";
import AppText from "../components/AppText";
import AudioBar from "../components/AudioBar";
import CustomModal from "../components/CustomModal";
import { useNavigation } from "@react-navigation/native";

const db = SQLite.openDatabase("echoDB.db");

const imagesDir = FileSystem.documentDirectory + "images/";
const soundsDir = FileSystem.documentDirectory + "sounds/";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  // password: Yup.string().required().min(4).label("Password"),
});
function AddEditScreen({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [selectedValue, setSelectedValue] = useState(route.params.root);
  const [uri, setUri] = useState();

  const navigation = useNavigation();

  async function insertData(name) {
    if (image === "") {
      Alert.alert(
        "Missing image",
        "Please select an image",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }

    const imgDirInfo = await FileSystem.getInfoAsync(imagesDir);
    const sndDirInfo = await FileSystem.getInfoAsync(soundsDir);

    if (!imgDirInfo.exists) {
      console.log("Images directory doesn't exist, creating...");
      await FileSystem.makeDirectoryAsync(imagesDir, { intermediates: true });
    }

    if (!sndDirInfo.exists) {
      console.log("Sounds directory doesn't exist, creating...");
      await FileSystem.makeDirectoryAsync(soundsDir, { intermediates: true });
    }

    let fileExtension = image.split(".").pop();
    let newImageLocation = imagesDir + name + "." + fileExtension;
    FileSystem.moveAsync({ from: image, to: newImageLocation });

    let newSoundLocation = soundsDir + name + ".m4a";
    FileSystem.moveAsync({ from: uri, to: newSoundLocation });

    console.log(newImageLocation);
    console.log(newSoundLocation);

    var arr = insertToDB(name, newImageLocation, newSoundLocation);

    if (route.params.root === "Home") {
      navigation.goBack("Home");
    } else {
      navigation.replace("Category", {
        items: arr.map((i) => i.category === selectedValue),
      });
    }
  }

  function insertToDB(name, newImageLocation, newSoundLocation) {
    var arr = [];
    db.transaction((tx) => {
      tx.executeSql(
        "insert into items (name, image, sound, category, is_category) values (?, ?, ?, ?, ?)",
        [
          name,
          newImageLocation,
          newSoundLocation,
          selectedValue,
          route.params.isCategory,
        ],
        (_, results) => {
          console.log("Results", results.rowsAffected);
        },
        (_, err) => {
          console.log(err);
        }
      );
      tx.executeSql("select * from items", [], (_, { rows }) => {
        console.log(JSON.stringify(rows));
        arr = rows;
      });
    });

    return arr;
  }

  return (
    <Screen style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.image}>
          {image ? (
            <Image style={styles.imageInside} source={{ uri: image }} />
          ) : (
            <MaterialCommunityIcons name="camera-plus" size={150} />
          )}
        </View>
      </TouchableOpacity>

      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setImage={setImage}
      />

      <AppForm
        initialValues={{ name: "" }}
        onSubmit={(values) => insertData(values.name)}
        validationSchema={validationSchema}
      >
        <View style={styles.marginBottom}>
          <AppText style={styles.text}>Name</AppText>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            name="name"
            textContentType="name"
            style={styles.text}
          />
        </View>
        {!route.params.isCategory && (
          <View style={styles.marginBottom}>
            <AppText style={styles.text}>Category</AppText>

            <Dropdown
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </View>
        )}
        <View style={styles.marginBottom}>
          <AppText style={styles.text}>Audio</AppText>
          <AudioBar
            category={route.params.isCategory}
            uri={uri}
            setUri={setUri}
          />
        </View>

        <View style={styles.submit}>
          <SubmitButton title="Save" />
        </View>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  image: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
    width: 175,
    height: 175,
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: 15,
    marginBottom: 50,
  },
  imageInside: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 15,
  },
  text: {
    color: colors.brown,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  marginBottom: {
    marginBottom: 25,
  },
  submit: {
    flex: 1,
    width: "50%",
    alignSelf: "center",
    justifyContent: "flex-end",
  },
});

export default AddEditScreen;
