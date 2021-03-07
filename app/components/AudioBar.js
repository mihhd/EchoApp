import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Stopwatch } from "react-native-stopwatch-timer";
import { assetsItems } from "../config/assetsItems";

import colors from "../config/colors";
import AppContext from "../context/appContext";

function AudioBar({ category, uri, setUri, item = null }) {
  //set content language; this approach should be changed in the future
  const appContext = useContext(AppContext);

  const [textPlay, setTextPlay] = useState("");
  const [textRecord, setTextRecord] = useState("");
  const [textAudio, setTextAudio] = useState("");

  useEffect(() => {
    if (appContext.settings.language === "mk") {
      setTextPlay("Слушни");
      setTextRecord("Сними");
      setTextAudio("Звук");
    } else {
      setTextPlay("Play");
      setTextRecord("Record");
      setTextAudio("Audio");
    }
  }, [appContext.settings.language]);

  /////////////////////////////////////////////////////////////

  category = category;
  const [recording, setRecording] = useState();
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [noSound, setNoSound] = useState(false);

  async function playSound() {
    if (uri === undefined) {
      return;
    }
    const soundObject = new Audio.Sound();

    try {
      if (item !== null) {
        if (appContext.settings.language === "en") {
          await soundObject.loadAsync(
            uri.startsWith("file")
              ? { uri: uri }
              : assetsItems.find((i) => i.name_en === item.name_en).sound_en
          );
        } else {
          await soundObject.loadAsync(
            uri.startsWith("file")
              ? { uri: uri }
              : assetsItems.find((i) => i.name_mk === item.name_mk).sound_mk
          );
        }
      } else {
        await soundObject.loadAsync({ uri });
      }

      let audioPlayer1 = soundObject;
      audioPlayer1.playAsync();
      // Your sound is playing!
    } catch (error) {}
  }

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      console.log("Recording started");
      setIsStopwatchStart(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording(isSaving) {
    console.log("Stopping recording..");
    await recording.stopAndUnloadAsync();
    setRecording(undefined);
    setIsStopwatchStart(true);
    setResetStopwatch(true);
    if (isSaving) {
      const uri = recording.getURI();
      setUri(uri);
      console.log("Recording stored at", uri);
    } else {
      setUri(undefined);
    }
  }

  return (
    <>
      <View style={styles.audio}>
        <TouchableOpacity onPress={playSound} style={{ alignItems: "center" }}>
          <MaterialCommunityIcons
            name="volume-high"
            size={40}
            color={uri ? colors.secondary : colors.dark}
          />
          <Text style={styles.audioText}>{textPlay}</Text>
        </TouchableOpacity>
        {!noSound && (
          <TouchableOpacity
            onPress={startRecording}
            disabled={recording}
            style={{ alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name="microphone"
              size={40}
              color={recording ? colors.danger : colors.dark}
            />
            <Text style={styles.audioText}>{textRecord}</Text>
          </TouchableOpacity>
        )}

        {!!+category ? (
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => setNoSound(!noSound)}
          >
            <MaterialCommunityIcons
              name="volume-off"
              size={40}
              color={noSound ? colors.secondary : colors.dark}
            />
            <Text style={styles.audioText}>{textAudio}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{ width: 50 }}></TouchableOpacity>
        )}
      </View>

      {recording && (
        <View style={styles.recorder}>
          <TouchableOpacity
            style={[styles.circle, styles.cancel]}
            onPress={() => stopRecording(false)}
          >
            <MaterialCommunityIcons
              name="close"
              size={28}
              color={colors.danger}
            />
          </TouchableOpacity>
          <View style={styles.time}>
            <MaterialCommunityIcons
              name="circle"
              color={colors.danger}
              style={{ marginRight: 5 }}
            />

            <Stopwatch
              start={isStopwatchStart}
              reset={resetStopwatch}
              options={{ backgroundColor: "transparent" }}
            />
          </View>

          <TouchableOpacity
            style={[styles.circle, styles.save]}
            onPress={() => stopRecording(true)}
          >
            <MaterialCommunityIcons
              name="check"
              size={28}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  audio: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  audioText: {
    alignSelf: "center",
    color: colors.light,
  },
  recorder: {
    height: 70,
    backgroundColor: colors.light,
    borderBottomWidth: 2,
    borderBottomColor: colors.dark,
    flexDirection: "row",
    justifyContent: "center",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cancel: {
    borderColor: colors.danger,
  },
  save: {
    borderColor: colors.primary,
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AudioBar;
