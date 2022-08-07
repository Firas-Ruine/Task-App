import React from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import { useCallback, useEffect, useReducer, useState } from "react";
import CustomInput from "../components/CustomInput";
import Shape from "../components/Shape";
import DeviceDimensions from "../constants/DeviceDimensions";
import CustomBigText from "../components/CustomBigText";
import CustomButton from "../components/CustomButton";
import Theme from "../constants/Theme";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};
const LoginScreen = ({ props, navigation }) => {
  const [error, setError] = useState();
  const dispatch = useDispatch();

  //Reduce the form
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  //Set the error alert
  useEffect(() => {
    if (error) {
      Alert.alert("Wrong email or password!", error, [{ text: "Ok" }]);
    }
  }, [error]);

  //Login function
  const Login = async () => {
    action = authActions.login(
      formState.inputValues.email,
      formState.inputValues.password
    );
    setError(null);
    try {
      await dispatch(action);
      navigation.navigate("Tasks");
    } catch (err) {
      setError(err.message);
    }
  };

  //Handling the input changes
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10}
    >
      <Shape source={require("../assets/shape.png")} />
      <ScrollView>
        <View style={styles.textContainer}>
          <CustomBigText text="Welcome Back!" />
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require("../assets/login.png")}
          />
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            id="email"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            onInputChange={inputChangeHandler}
            initialValue=""
            errorText="Email is required"
            placeholder="Enter your email"
          />
          <CustomInput
            id="password"
            keyboardType="default"
            secureTextEntry
            minLength={6}
            required
            autoCapitalize="none"
            onInputChange={inputChangeHandler}
            initialValue=""
            errorText="Password is required"
            placeholder="Enter password"
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton text="Sign In" style={styles.button} onPress={Login} />
        </View>
        <View style={styles.bottomTextContainer}>
          <Text style={styles.alreadyText}>
            Don't have an account ?
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.signinText}> Sign Up</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  //Image Style
  image: {
    width: DeviceDimensions.width * 0.465,
    height: DeviceDimensions.height * 0.209,
    marginTop: DeviceDimensions.height * 0.043,
    marginBottom: DeviceDimensions.height * 0.03,
  },

  //Text Container Style
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: DeviceDimensions.height * 0.0431,
    overflow: "visible",
  },

  //Button Container Style
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: DeviceDimensions.height * 0.08,
  },

  //Button Style
  button: {
    height: DeviceDimensions.height * 0.0764,
    width: DeviceDimensions.width * 0.87,
  },

  //Form Container Style
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  //Bottom Text Container Style
  bottomTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: DeviceDimensions.height * 0.0357,
  },

  //D'ont have an account ?  Style
  alreadyText: {
    fontFamily: "poppins-regular",
    fontWeight: "400",
    letterSpacing: 1,
    fontSize: DeviceDimensions.height * 0.0172,
  },

  //Sign In Link Style
  signinText: {
    fontFamily: "poppins-bold",
    fontWeight: "400",
    color: Theme.button,
    letterSpacing: 1,
    fontSize: DeviceDimensions.height * 0.0172,
  },
});
export default LoginScreen;
