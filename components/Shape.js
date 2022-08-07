import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import DeviceDimensions from "../constants/DeviceDimensions";

const Shape = (props) => {
  return (
    <Image resizeMode='contain' source={props.source} style={{ ...styles.shape, ...props.style }} />
  );
};
const styles = StyleSheet.create({
  shape: {
   /* width:DeviceDimensions.width*0.5,
    height:DeviceDimensions.height*0.2*/
  },
});
export default Shape;
