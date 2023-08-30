import * as types from "./actionTypes";

const initialState = {

  isLoginProcess: false,
  isLoginSuccess: false,
  isLoginFail: false,
  isLoginMessage: "",
  LoginUserData:{},

  isSignupProcess: false,
  isSignupSuccess: false,
  isSignupFail: false,
  isSignupMessage: "",

};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {

    case types.USER_SIGNUP_PROCESS:
      return {
        ...state,
        isSignupSuccess: false,
        isSignupProcess: true,
        isSignupFail: false,
        isSignupMessage: "",
      };
    case types.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isSignupSuccess: true,
        isSignupProcess: false,
        isSignupFail: false,
        isSignupMessage: payload.message,
      };
    case types.USER_SIGNUP_FAILURE:
      return {
        ...state,
        isSignupSuccess: false,
        isSignupProcess: false,
        isSignupFail: true,
        isSignupMessage: payload,
      };

    case types.USER_LOGIN_PROCESS:
      return {
        ...state,
        isLoginSuccess: false,
        isLoginProcess: true,
        isLoginFail: false,
        isLoginMessage: "",
        LoginUserData:{},
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: true,
        isLoginProcess: false,
        isLoginFail: false,
        isLoginMessage: payload.message,
        LoginUserData:payload.data,
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoginSuccess: false,
        isLoginProcess: false,
        isLoginFail: true,
        isLoginMessage: payload,
        LoginUserData:{},
      };

    default:
      return state;
  }
};
