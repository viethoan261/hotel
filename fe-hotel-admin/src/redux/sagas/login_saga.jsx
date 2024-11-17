import { put, takeLatest, call, all, fork } from "redux-saga/effects";
import axios from "axios";
import { isFunction } from "lodash";
import actions from "../actions/login";
import rf from "../../requests/RequestFactory";
import jwtDecode from "jwt-decode";

import {
  REGISTER,
  REGISTER_SUCCEED,
  REGISTER_FAIL,
  LOGIN_SUCCEED,
  LOGIN,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/login/action_types";
import utils from "../../utils";
import { useNavigate } from "react-router-dom";

function* register(action) {
  try {
    const { data } = yield call((params) => rf.getRequest("LoginRequest").register(params), action.params);
    yield put(actions.registerSucceed(data));
    console.log("asdas");
    if (isFunction(action.callback)) {
      yield action.callback();
    }
    if (!data.hasError) {
      utils.showNotification("Success", "Create new account successfully", "success");
    }
  } catch (err) {
    console.log(err);
    yield put(actions.registerFail(err));
  }
}

function* login(action) {
  try {
    const { data } = yield call((params) => rf.getRequest("LoginRequest").login(params), action.params);
    if (data && !data.hasErr) {
      utils.showNotification("Success", "Login successfully", "success");
      const decodedToken = jwtDecode(data.data);
      localStorage.setItem("token", data.data);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
      window.location.pathname = "/";
    }
    yield put(actions.loginSucceed(data));
  } catch (err) {
    console.log(err);
    yield put(actions.logoutFail(err));
  }
}

function* watchAllUsers() {
  yield takeLatest(REGISTER, register);
  yield takeLatest(LOGIN, login);
}

export default function* rootSaga() {
  yield all([fork(watchAllUsers)]);
}
