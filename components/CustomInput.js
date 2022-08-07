import { View, TextInput, StyleSheet, Text, Dimensions } from "react-native";
import React, { useReducer, useEffect } from "react";
import Theme from "../constants/Theme";
import DeviceDimensions from "../constants/DeviceDimensions";

//Input declaration
const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";
const INPUT_SUBMITTED = "INPUT_SUBMITTED";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    case INPUT_SUBMITTED:
      return {
        ...state,
        value: "",
      };
    default:
      return state;
  }
};
const CustomInput = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  //Validate data
  const textChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
    if (props.submitted) {
      dispatch({ type: INPUT_SUBMITTED });
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={{ ...styles.input, ...props.style }}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginLeft: Dimensions.get("screen").width * 0.03,
        }}
      >
        {!inputState.isValid && inputState.touched && (
          <Text style={styles.errorText}>{props.errorText}</Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    backgroundColor: Theme.white,
    width: DeviceDimensions.width * 0.866,
    height: DeviceDimensions.height * 0.0628,
    borderRadius: 22,
    paddingHorizontal: DeviceDimensions.width * 0.0667,
    marginTop: DeviceDimensions.height * 0.0259,
    fontFamily: "poppins-regular",
    fontSize: DeviceDimensions.height * 0.016,
    color: "rgba(0, 0, 0, 0.7)",
    letterSpacing: 1,
  },
  errorText: {
    fontSize: DeviceDimensions.height * 0.013,
    color: "#D24141",
    textAlign: "right",
  },
});
export default CustomInput;
