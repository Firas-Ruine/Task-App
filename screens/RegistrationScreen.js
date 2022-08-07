import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import CustomInput from "../components/CustomInput";
import React, { useReducer, useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import Shape from "../components/Shape";
import CustomBigText from "../components/CustomBigText";
import DeviceDimensions from "../constants/DeviceDimensions";
import CustomSmallText from "../components/CustomSmallText";
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
const RegistrationScreen = ({ props, navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  //Reduce the form
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      fullname: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    inputValidities: {
      fullname: false,
      email: false,
      password: false,
      password_confirmation: false,
    },
    formIsValid: false,
  });

  //Set the error alert
  useEffect(() => {
    if (error) {
      Alert.alert("Form Invalid!", error, [{ text: "Ok" }]);
    }
  }, [error]);

  //Create account function
  const SignUp = async () => {
    action = authActions.signup(
      formState.inputValues.fullname,
      formState.inputValues.email,
      formState.inputValues.password,
      formState.inputValues.password_confirmation
    );
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      navigation.navigate("Login");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
      setIsLoading(false);
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
      keyboardVerticalOffset={20}
      style={{ flex: 1 }}
    >
      <Shape source={require("../assets/shape.png")} />
      <ScrollView>
        <View style={styles.textContainer}>
          <CustomBigText text="Welcome Onboard!" style={styles.bigText} />
          <CustomSmallText
            style={styles.smallText}
            text="Let’s help you meet up your tasks"
          />
        </View>
        <View style={styles.formContainer}>
          <CustomInput
            id="fullname"
            required
            onInputChange={inputChangeHandler}
            initialValue=""
            errorText="Fullname is required"
            placeholder="Enter your full name"
          />
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
          <CustomInput
            id="password_confirmation"
            keyboardType="default"
            secureTextEntry
            minLength={6}
            required
            autoCapitalize="none"
            onInputChange={inputChangeHandler}
            initialValue=""
            errorText="Confirm password is required"
            placeholder="Confirm password"
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            text="Register"
            style={styles.button}
            onPress={SignUp}
          />
        </View>
        <View style={styles.bottomTextContainer}>
          <Text style={styles.alreadyText}>
            Already have an account ?
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.signupText}> Sign In</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  //Text Container Style
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: DeviceDimensions.height * 0.08,
  },

  smallText: {
    marginTop: DeviceDimensions.height * 0.0172,
  },

  //Button Container Style
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: DeviceDimensions.height * 0.0616,
  },

  button: {
    height: DeviceDimensions.height * 0.0764,
    width: DeviceDimensions.width * 0.87,
  },

  //Form Container Style
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: DeviceDimensions.height * 0.0344,
  },

  bottomTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: DeviceDimensions.height * 0.0283,
  },

  //Already have an account ? Style
  alreadyText: {
    fontFamily: "poppins-regular",
    fontWeight: "400",
    letterSpacing: 1,
    fontSize: DeviceDimensions.height * 0.0172,
  },

  //Sign up Link Style
  signupText: {
    fontFamily: "poppins-bold",
    fontWeight: "400",
    color: Theme.button,
    letterSpacing: 1,
    fontSize: DeviceDimensions.height * 0.0172,
  },
});
export default RegistrationScreen;
