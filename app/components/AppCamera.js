import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "./Screen";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

function AppCamera({ setImage, setModalVisible }) {
  const [hasPermission, setHasPermission] = useState(null);

  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [uri, setUri] = useState("");

  const cameraRef = useRef();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.2, base64: true, skipProcessing: false };

      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        cameraRef.current.pausePreview();
        setIsPreview(true);
        setUri(source);
        console.log("picture source", source);
      }
    }
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  const saveImage = async () => {
    await cameraRef.current.resumePreview();
    setImage(uri);
    setModalVisible(false);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <Screen>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("cammera error", error);
        }}
      />
      <View style={styles.container}>
        {isPreview ? (
          <View style={styles.preview}>
            <TouchableOpacity onPress={cancelPreview}>
              <MaterialCommunityIcons
                name={"close-circle"}
                size={40}
                color={"white"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={saveImage}>
              <MaterialCommunityIcons
                name={"check-circle"}
                size={40}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.control}>
            <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
              <MaterialCommunityIcons
                name={"compare-vertical"}
                size={40}
                color={"white"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!isCameraReady}
              onPress={takePicture}
              style={styles.capture}
            />
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
  preview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 40,
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "#f5f6f5",
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  text: {
    color: "#fff",
  },
});

export default AppCamera;
