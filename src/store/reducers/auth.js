import { AUTH_SUCCES, AUTH_LOGOUT, AUTH_FAIL } from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token") || null,
  isFailed: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCES:
      return {
        ...state,
        isFailed: false,
        token: action.token
      };
    case AUTH_FAIL: {
      return {
        ...state,
        isFailed: true
      };
    }
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
}
