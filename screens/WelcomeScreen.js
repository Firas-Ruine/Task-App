import React from "react";
import { Image, View, StyleSheet } from "react-native";
import CustomBigText from "../components/CustomBigText";
import CustomButton from "../components/CustomButton";
import CustomSmallText from "../components/CustomSmallText";
import Shape from "../components/Shape";
import DeviceDimensions from "../constants/DeviceDimensions";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Shape source={require("../assets/shape.png")} />
      <View style={styles.imageContainer}>
        <Image
          style={styles.welcome}
          source={require("../assets/welcome.png")}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <CustomBigText
            text="Gets things done with TODO"
            style={styles.bigText}
          />
          <CustomSmallText
            style={styles.smallText}
            text=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum
            dictum tempus, interdum at dignissim metus. Ultricies sed nunc."
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          text="Get Started"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  //Image Container Style
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: DeviceDimensions.height * 0.16,
  },

  //Image Style
  welcome: {
    height: DeviceDimensions.height * 0.21,
    width: DeviceDimensions.width * 0.462,
  },

  //Text Container Style
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: DeviceDimensions.width * 0.85,
  },

  //Title Style
  bigText: {
    marginTop: DeviceDimensions.height * 0.0554,
  },

  //Description Style
  smallText: {
    marginTop: DeviceDimensions.height * 0.0443,
  },

  //button Container Style
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: DeviceDimensions.height * 0.113,
  },

  //Button Style
  button: {
    height: DeviceDimensions.height * 0.0764,
    width: DeviceDimensions.width * 0.87,
  },
});
export default WelcomeScreen;
