import * as SplashScreenImport from "expo-splash-screen";
import { StyleSheet, View } from "react-native";
import { React, useCallback, useEffect, useState } from "react";
SplashScreenImport.preventAutoHideAsync();
const SplashScreen = (props) => {
  const [appIsReady, setAppIsReady] = useState(false);

  //Set the settings of Splash Screen (Time = 1 seconde)
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreenImport.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ backgroundColor: "#f5f5f5", flex: 1 }}
      onLayout={onLayoutRootView}
    ></View>
  );
};

export default SplashScreen;
