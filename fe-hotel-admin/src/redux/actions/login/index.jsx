import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCEED,
  LOGOUT,
  LOGOUT_FAIL,
  REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCEED,
} from "./action_types";

export default {
  register: (data, callback) => ({
    type: REGISTER,
    params: {
      data,
    },
    callback,
  }),
  registerSucceed: (data) => ({
    type: REGISTER_SUCCEED,
    data,
  }),
  registerFail: (err) => ({
    type: REGISTER_FAIL,
    err,
  }),

  login: (params) => ({
    type: LOGIN,
    params,
  }),
  loginSucceed: (data) => ({
    type: LOGIN_SUCCEED,
    data,
  }),
  loginFail: (err) => ({
    type: LOGIN_FAIL,
    err,
  }),

  logout: (data) => ({
    type: LOGOUT,
    param: {
      data,
    },
  }),
  logoutSucceed: (data) => ({
    type: LOGIN_SUCCEED,
    param: {
      data,
    },
  }),
  logoutFail: (err) => ({
    type: LOGOUT_FAIL,
    err,
  }),
};
