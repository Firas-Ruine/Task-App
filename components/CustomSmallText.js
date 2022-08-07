import React from "react";
import { Text, StyleSheet } from "react-native";
import DeviceDimensions from "../constants/DeviceDimensions";
const CustomSmallText = (props) => {
  return <Text style={{ ...styles.text, ...props.style }}>{props.text}</Text>;
};
const styles = StyleSheet.create({
  text: {
    //marginTop: DeviceDimensions.height * 0.0443,
    textAlign: "center",
    fontFamily: "poppins-regular",
    fontSize: DeviceDimensions.height * 0.016,
    fontWeight: "400",
    letterSpacing: 1,
  },
});
export default CustomSmallText;
