import axios from "axios";
import * as types from "./actionTypes";

const END_POINT = "https://authentication-q13p.onrender.com"

// signup function
const signUp = (userInput) => async (dispatch) => {

  // dispatch signup process
  dispatch({ type: types.USER_SIGNUP_PROCESS });

  try {

    // make post request
    const res = await axios.post(`${END_POINT}/user/signup`, userInput);

    // dispaltch signup success
    dispatch({ type: types.USER_SIGNUP_SUCCESS, payload: res.data });

  } catch (err) {

    // dispatch signup fail
    dispatch({ type: types.USER_SIGNUP_FAILURE, payload: err.response.data.error });
  }
};


// login function
const login = (userInput) => async (dispatch) => {

  // dispatch login process
  dispatch({ type: types.USER_LOGIN_PROCESS });

  try {

    // make post request
    const res = await axios.post(`${END_POINT}/user/login`, userInput);

    // dispatch login success
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res.data });

    // save jwt token in local storage
    localStorage.setItem("Todo-application-jwt", JSON.stringify(res.data.data.token))

  } catch (err) {

    // dispatch login fail
    dispatch({
      type: types.USER_LOGIN_FAILURE,
      payload: err.response.data.error,
    });
  }
};



export { signUp, login };
