import { AUTHENTICATE,LOGOUT } from "../actions/auth";

//Init the State
const initialState = {
  token: null,
  userId: null,
  fullname: null,
};


export default (state = initialState, action) => {
  //Get data from the Auth Action
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        fullname: action.fullname,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
