import React from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import PinModal from "./PinModal";
import { useState } from "react";

function EditButton({ settingsHeader, language }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [randomPin, setRandomPin] = useState("0000");

  function generatePin() {
    var val = Math.floor(1000 + Math.random() * 9000);
    setRandomPin(val.toString());
    setModalVisible(true);
  }

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={generatePin}>
        <MaterialCommunityIcons
          name="cog-outline"
          color={colors.light}
          size={34}
        />
      </TouchableOpacity>
      <PinModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        randomPin={randomPin}
        settingsHeader={settingsHeader}
        language={language}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});

export default EditButton;
