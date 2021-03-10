import React, { useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Platform,
  Pressable,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";
import AppCamera from "./AppCamera";

const CustomModal = ({
  setModalVisible,
  modalVisible,
  setImage,
  toCamera,
  setToCamera,
}) => {
  //select image from galery
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setModalVisible(false);
    }
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {toCamera ? (
          <AppCamera setImage={setImage} setModalVisible={setModalVisible} />
        ) : (
          <TouchableOpacity
            style={styles.centeredView}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.modalView}>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  color={colors.primary}
                  size={30}
                />
              </Pressable>

              <View style={styles.row}>
                <View>
                  <TouchableOpacity onPress={() => setToCamera(true)}>
                    <View style={styles.circle}>
                      <MaterialCommunityIcons
                        name="camera"
                        color={colors.primary}
                        size={40}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.text}>Camera</Text>
                </View>

                <View>
                  <TouchableOpacity onPress={pickImage}>
                    <View style={styles.circle}>
                      <MaterialCommunityIcons
                        name="image"
                        color={colors.primary}
                        size={40}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.text}>Galery</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  modalView: {
    margin: 40,
    backgroundColor: colors.light,
    borderRadius: 40,
    padding: 35,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    marginBottom: 5,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: colors.primary,
    alignSelf: "center",
  },
});

export default CustomModal;
