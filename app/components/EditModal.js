import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

import colors from "../config/colors";
import AppText from "./AppText";
import { useNavigation } from "@react-navigation/native";

const db = SQLite.openDatabase("echoDB.db");

const EditModal = ({ setModalVisible, modalVisible, itemToEdit, language }) => {
  const navigation = useNavigation();
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    typeof itemToEdit === "undefined"
      ? setItemName("")
      : setItemName(
          language === "en"
            ? '"' + itemToEdit.name_en + '"'
            : '"' + itemToEdit.name_mk + '"'
        );
  }, [itemToEdit]);

  function editItem() {
    setModalVisible(!modalVisible);
    navigation.navigate("AddEdit", {
      isCategory: itemToEdit.is_category,
      root: itemToEdit.category,
      item: itemToEdit,
    });
  }

  function deleteItem() {
    db.transaction((tx) => {
      tx.executeSql(
        `delete from items where id = ?;`,
        [itemToEdit.id],
        () => {
          setModalVisible(!modalVisible);
          alert("Item was successfully deleted.");
        },
        () => alert("Error. Item was not deleted.")
      );
    });
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
              <AppText style={[styles.text, { color: colors.white }]}>
                {itemName}
              </AppText>
            </View>

            <TouchableOpacity
              style={[
                styles.row,
                {
                  backgroundColor: colors.white,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.light,
                },
              ]}
              onPress={editItem}
            >
              <MaterialCommunityIcons
                name="pencil-outline"
                size={28}
                color={colors.medium}
              />
              <AppText style={[styles.text, { color: colors.medium }]}>
                Edit
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.row, { backgroundColor: colors.white }]}
              onPress={deleteItem}
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={28}
                color={colors.danger}
              />
              <AppText style={[styles.text, { color: colors.danger }]}>
                Delete
              </AppText>
            </TouchableOpacity>
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

export default EditModal;
