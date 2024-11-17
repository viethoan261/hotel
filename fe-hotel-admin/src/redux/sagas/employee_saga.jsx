import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { GET_EMPLOYEE, TOGGLE_EMPLOYEE, UPDATE_EMPLOYEE } from "../actions/employees/action_types";
import rf from "../../requests/RequestFactory";
import actions from "../actions/employees";
import { isFunction } from "lodash";
import utils from "../../utils";

function* getEmployee(action) {
  try {
    const { data } = yield call((params) => rf.getRequest("EmployeeRequest").getEmployee(params), action.params);
    yield put(actions.getEmployeeSucceed(data.data));
  } catch (err) {
    console.log(err);
    yield put(actions.getEmployeeFail(err));
  }
}

function* updateEmployee(action) {
  try {
    yield call((params) => rf.getRequest("EmployeeRequest").updateEmployee(params), action.params);
    if (isFunction(action.callback)) {
      yield action.callback();
    }
    utils.showNotification("Success", "Update employee successfully", "success");
  } catch (err) {
    yield put(actions.updateEmployeeFail(err));
  }
}

function* toggleEmployee(action) {
  try {
    yield call((params) => rf.getRequest("EmployeeRequest").toggleEmployee(params), action.params);
    if (isFunction(action.callback)) {
      yield action.callback();
    }
    utils.showNotification("Success", "Update employee successfully", "success");
  } catch (err) {
    console.log(err);
    yield put(actions.toggleEmployeeFail(err));
  }
}

function* watchEmployees() {
  yield takeLatest(GET_EMPLOYEE, getEmployee);
  yield takeLatest(UPDATE_EMPLOYEE, updateEmployee);
  yield takeLatest(TOGGLE_EMPLOYEE, toggleEmployee);
}

export default function* rootSaga() {
  yield all([fork(watchEmployees)]);
}
