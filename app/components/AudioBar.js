import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Stopwatch } from "react-native-stopwatch-timer";
import { assetsItems } from "../config/assetsItems";

import AppText from "./AppText";
import colors from "../config/colors";

function AudioBar({ category, uri, setUri, item = null }) {
  category = category;
  const [recording, setRecording] = useState();
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  async function playSound() {
    if (uri === undefined) {
      console.log("Bitch still fat");
      return;
    }
    const soundObject = new Audio.Sound();

    try {
      if (item !== null) {
        await soundObject.loadAsync(
          uri.startsWith("file")
            ? { uri: uri }
            : assetsItems.find((i) => i.name === item.name).sound
        );
      } else {
        await soundObject.loadAsync({ uri });
      }

      let audioPlayer1 = soundObject;
      audioPlayer1.playAsync();
      // Your sound is playing!
    } catch (error) {
      console.log("made");
    }
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
      console.log("Fuck fat bitch");
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
          <AppText style={styles.audioText}>Play</AppText>
        </TouchableOpacity>

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
          <AppText style={styles.audioText}>Record</AppText>
        </TouchableOpacity>
        {category ? (
          <TouchableOpacity style={{ alignItems: "center" }}>
            <MaterialCommunityIcons
              name="volume-off"
              size={40}
              color={colors.dark}
            />
            <AppText style={styles.audioText}>Audio</AppText>
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
