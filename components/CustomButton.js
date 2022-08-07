import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import DeviceDimensions from "../constants/DeviceDimensions";
import Theme from "../constants/Theme";
const CustomButton = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...props.style }}
      onPress={props.onPress}
    >
      <Text style={styles.textButton}>{props.text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.button,
    //height: DeviceDimensions.height * 0.0764,
    //width: DeviceDimensions.width * 0.87,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "poppins-bold",
    fontSize: DeviceDimensions.height * 0.0222,
    fontWeight: "600",
    color: Theme.white,
  },
});
export default CustomButton;
