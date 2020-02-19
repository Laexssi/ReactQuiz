import axios from "axios";
import { AUTH_SUCCES, AUTH_LOGOUT } from "./actionTypes";

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBu-e-uM2iKpQFrJFgHsT-XYeUdncBcHbA";
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBu-e-uM2iKpQFrJFgHsT-XYeUdncBcHbA";
    }
    const response = await axios.post(url, authData);
    console.log(response.data);
    const {
      idToken,
      localId,
      expiresIn,
      email: confirmedEmail
    } = response.data;
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    localStorage.setItem("token", idToken);
    localStorage.setItem("userId", localId);
    localStorage.setItem("email", confirmedEmail);
    localStorage.setItem("expirationDate", expirationDate);

    dispatch(authSucces(idToken));
    dispatch(autoLogout(expiresIn));
  };
}
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT
  };
}
export function autoLogout(time) {
  console.log("autoLogout after " + time * 1000 + " ms");
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}
export function authSucces(token) {
  return {
    type: AUTH_SUCCES,
    token
  };
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) dispatch(logout());
      else {
        dispatch(authSucces(token));
        dispatch(
          autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}
