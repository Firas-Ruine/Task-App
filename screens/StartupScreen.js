import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Theme from "../constants/Theme";
import * as authActions from "../store/actions/auth";
import { useDispatch } from "react-redux";
const StartupScreen = ({ props, navigation }) => {
  const dispatch = useDispatch();

  //Check if the user logged in or not using Async Stroage
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        navigation.navigate("Welcome");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, fullname } = transformedData;

      if (!fullname || !token || !userId) {
        navigation.navigate("Welcome");
        return;
      }

      navigation.navigate("Dashboard");
      dispatch(authActions.authenticate(userId, token, fullname));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Theme.primary} />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default StartupScreen;