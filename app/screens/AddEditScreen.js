import React, { useContext, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Text,
} from "react-native";
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
import AudioBar from "../components/AudioBar";
import CustomModal from "../components/CustomModal";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../context/appContext";

const db = SQLite.openDatabase("echoDB.db");

const imagesDir = FileSystem.documentDirectory + "images/";
const soundsDir = FileSystem.documentDirectory + "sounds/";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
});

function AddEditScreen({ route }) {
  const appContext = useContext(AppContext);
  const { localization } = useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [selectedValue, setSelectedValue] = useState(route.params.root);
  const [uri, setUri] = useState();
  const navigation = useNavigation();
  const [toCamera, setToCamera] = useState(false);

  useEffect(() => {
    if (typeof route.params.item !== "undefined") {
      setImage(route.params.item.image);
      setUri(route.params.item.sound);
    }
  }, []);

  async function saveData(name) {
    if (typeof route.params.item !== "undefined") {
      updateData(name);
    } else {
      insertData(name);
    }
  }

  async function updateData(name) {
    var newImageLocation = moveImageToDocumentDir(name);
    var newSoundLocation = moveSoundToDocumentDir(name);

    Promise.all([newImageLocation, newSoundLocation])
      .then((val) => updateItem(route.params.item.id, name, val[0], val[1]))
      .then(navigate())
      .catch((error) => {
        console.error(error.message);
      });
  }

  function insertData(name) {
    if (image === "") {
      Alert.alert(
        "Missing image",
        "Please select an image",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }

    var newImageLocation = moveImageToDocumentDir(name);
    var newSoundLocation = moveSoundToDocumentDir(name);

    Promise.all([newImageLocation, newSoundLocation])
      .then((val) => insertToDB(name, val[0], val[1]))
      .then(navigate())
      .catch((error) => {
        console.error(error.message);
      });
  }

  function moveImageToDocumentDir(name) {
    return new Promise((resolve, reject) => {
      const imgDirInfo = FileSystem.getInfoAsync(imagesDir);

      if (!imgDirInfo.exists) {
        FileSystem.makeDirectoryAsync(imagesDir, { intermediates: true });
      }

      let fileExtension = image.split(".").pop();

      var newLocation;
      if (route.params.item && image === route.params.item.image) {
        newLocation = image;
      } else {
        newLocation = imagesDir + name + "." + fileExtension;
        FileSystem.copyAsync({ from: image, to: newLocation });
      }

      resolve(newLocation);
    });
  }

  function moveSoundToDocumentDir(name) {
    return new Promise((resolve, reject) => {
      const sndDirInfo = FileSystem.getInfoAsync(soundsDir);

      if (!sndDirInfo.exists) {
        FileSystem.makeDirectoryAsync(soundsDir, { intermediates: true });
      }

      var newLocation;
      if (route.params.item && uri === route.params.item.sound) {
        newLocation = uri;
      } else {
        newLocation = soundsDir + name + ".m4a";
        FileSystem.copyAsync({ from: uri, to: newLocation });
      }
      resolve(newLocation);
    });
  }

  function navigate() {
    if (!!!+route.params.isCategory) {
      navigation.goBack();
    } else {
      var arr = getCategoryItems();

      navigation.replace("Category", {
        items: arr.map((i) => i.category === selectedValue),
      });
    }
  }

  function insertToDB(name, newImageLocation, newSoundLocation) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "insert into items (name_en, name_mk, image, sound_en, sound_mk, category, is_category) values (?, ?, ?, ?, ?, ?, ?)",
          [
            name,
            name,
            newImageLocation,
            newSoundLocation,
            newSoundLocation,
            selectedValue,
            route.params.isCategory,
          ],
          (_, results) => {
            resolve();
          },
          (_, err) => {
            console.log(err);
            reject();
          }
        );
      });
    });
  }

  function updateItem(id, name, newImageLocation, newSoundLocation) {
    return new Promise((resolve, reject) => {
      var sqlQuery = `UPDATE items SET name_${appContext.settings.language} = ?, image = ?, sound_${appContext.settings.language} = ?, category = ? WHERE id = ?`;
      db.transaction((tx) => {
        tx.executeSql(
          sqlQuery,
          [name, newImageLocation, newSoundLocation, selectedValue, id],
          () => {
            console.log("Update success");
            resolve();
          },
          (_, err) => {
            console.log(err);
            reject();
          }
        );
      });
    });
  }

  function getCategoryItems() {
    var arr = [];

    db.transaction((tx) => {
      tx.executeSql("select * from items", [], (_, { rows }) => {
        arr = rows;
      });
    });

    return arr;
  }

  return (
    <Screen style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setToCamera(false);
        }}
      >
        <View style={styles.image}>
          {image ? (
            <Image
              style={styles.imageInside}
              source={image.startsWith("file") ? { uri: image } : image}
            />
          ) : (
            <MaterialCommunityIcons name="camera-plus" size={150} />
          )}
        </View>
      </TouchableOpacity>

      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setImage={setImage}
        toCamera={toCamera}
        setToCamera={setToCamera}
      />

      <AppForm
        initialValues={{ name: "" }}
        onSubmit={(values) => saveData(values.name)}
        validationSchema={validationSchema}
      >
        <View style={styles.marginBottom}>
          <Text style={styles.text}>{localization.t("text_name")}</Text>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            name="name"
            textContentType="name"
            style={styles.text}
          />
        </View>
        {!!!+route.params.isCategory && (
          <View style={styles.marginBottom}>
            <Text style={styles.text}>{localization.t("text_category")}</Text>

            <Dropdown
              root={route.params.root}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              language={appContext.settings.language}
            />
          </View>
        )}
        <View style={styles.marginBottom}>
          <Text style={styles.text}>{localization.t("text_audio")}</Text>
          <AudioBar
            category={route.params.isCategory}
            uri={uri}
            item={route.params.item}
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
