import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "./AppTextInput";

const db = SQLite.openDatabase("echoDB.db");

const PinModal = ({
  setModalVisible,
  modalVisible,
  randomPin,
  language,
  settingsHeader,
}) => {
  //set content language; this approach should be changed in the future

  const [textEnter, setTextEnter] = useState("");

  useEffect(() => {
    if (language === "mk") {
      setTextEnter("Внесете го овој број: ");
    } else {
      setTextEnter("Enter this number: ");
    }
  }, [language]);

  /////////////////////////////////////////////////////////////

  function enterPin(text) {
    if (text === randomPin) {
      setModalVisible(false);
      settingsHeader();
    }
  }

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
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <View style={[styles.row, { backgroundColor: colors.primary }]}>
              <Text style={[styles.text, { color: colors.white }]}>
                {textEnter + randomPin}
              </Text>
            </View>

            <View style={styles.row}>
              <AppTextInput
                keyboardType={"numeric"}
                maxLength={4}
                width={"100%"}
                onChangeText={(text) => enterPin(text)}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.4)",
  },
  modalView: {
    width: "60%",
    backgroundColor: colors.light,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    marginBottom: 5,
    alignSelf: "flex-end",
  },
  row: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginLeft: 10,
  },
});

export default PinModal;
