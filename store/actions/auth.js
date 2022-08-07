import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../constants/Api";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

//Authentification Dispatch Function
export const authenticate = (userId, token, fullname) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      fullname: fullname,
    });
  };
};

//Sign Up Function
export const signup = (fullname, email, password, password_confirmation) => {
  return async (dispatch) => {
    const response = await fetch(Api.api + "/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      }),
    });

    //Handling the errors
    if (!response.ok) {
      let message = "Please check your informations!";
      throw new Error(message);
    }

    //Dispatch the response Data
    const responseData = await response.json();
    dispatch(
      authenticate(responseData.user.id, responseData.user.fullname, responseData.token)
    );

    //Save data in the phone Memory
    saveDataToStorage(responseData.token, responseData.user.id, responseData.user.fullname);
  };
};

//Sign In Function
export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(Api.api + "/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    //Handling the errors
    if (!response.ok) {
      let message = "Please check your informations!";
      throw new Error(message);
    }

    //Dispatch the response Data
    const responseData = await response.json();
    dispatch(
      authenticate(responseData.user.id, responseData.token, responseData.user.fullname)
    );

    //Save data in the phone Memory
    saveDataToStorage(responseData.token, responseData.user.id, responseData.user.fullname);
  };
};

//Logout Function
export const logout = () => {
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

//Sava Data in the memory Function
const saveDataToStorage = (token, userId, fullname) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      fullname: fullname,
    })
  );
};
