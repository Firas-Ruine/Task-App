import "react-native-gesture-handler";
import { useState, useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./navigation/MainNavigator";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import taskReducer from "./store/reducers/tasks";
import Theme from "./constants/Theme";

//Using Splash Screen
SplashScreen.preventAutoHideAsync();

//Declaring the reducers of our app
const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
});

//Add the reducers to store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  //Loading Custom Font (Poppins)
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
          "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
          "poppins-light": require("./assets/fonts/Poppins-Light.ttf"),
          "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
        });
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
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  //Main Screen Style
  container: {
    backgroundColor: Theme.background,
    flex: 1,
  },
});
