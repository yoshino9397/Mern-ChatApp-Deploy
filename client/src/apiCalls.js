import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const logoutCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGOUT_START" });
  try {
    // const res = await axios.post("auth/login", userCredential);
    dispatch({ type: "LOGOUT_SUCCESS", payload: userCredential });
  } catch (err) {
    dispatch({ type: "LOGOUT_FAILURE", payload: err });
  }
};