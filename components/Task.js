import Checkbox from "expo-checkbox";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import DeviceDimensions from "../constants/DeviceDimensions";
const Task = (props) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <View {...props} style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={props.onValueChange}
      />
      <Text numberOfLines={1} style={styles.title}>
        {props.title}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: DeviceDimensions.height * 0.0222,
  },
  checkbox: {
    height: DeviceDimensions.height * 0.0209,
    width: DeviceDimensions.height * 0.0209,
    borderWidth: 1,
    borderColor: "#0F4E52",
  },
  title: {
    marginLeft: DeviceDimensions.width * 0.0293,
    fontFamily: "poppins-regular",
    fontWeight: "400",
    fontSize: DeviceDimensions.height * 0.0148,
    letterSpacing: 1,
    color: "#000000BF",
  },
});

export default Task;
