import React from "react";
import { Text, StyleSheet } from "react-native";
import DeviceDimensions from "../constants/DeviceDimensions";
const CustomBigText = (props) => {
  return <Text style={{ ...styles.title, ...props.style }}>{props.text}</Text>;
};
const styles = StyleSheet.create({
  title: {
    fontFamily: "poppins-bold",
    fontSize: DeviceDimensions.height * 0.0222,
    fontWeight: "600",
    color: "rgba(0, 0, 0, 0.75)",
    letterSpacing: 1,
  },
});
export default CustomBigText;
