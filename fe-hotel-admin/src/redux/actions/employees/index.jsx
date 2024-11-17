import {
  GET_EMPLOYEE,
  GET_EMPLOYEE_FAIL,
  GET_EMPLOYEE_SUCCEED,
  TOGGLE_EMPLOYEE,
  TOGGLE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_SUCCEED,
} from "./action_types";

export default {
  getEmployee: (data) => ({
    type: GET_EMPLOYEE,
    params: {
      data,
    },
  }),
  getEmployeeSucceed: (data) => ({
    type: GET_EMPLOYEE_SUCCEED,
    data,
  }),
  getEmployeeFail: (err) => ({
    type: GET_EMPLOYEE_FAIL,
    err,
  }),

  updateEmployee: (params, callback) => ({
    type: UPDATE_EMPLOYEE,
    params,
    callback,
  }),
  updateEmployeeSucceed: (data) => ({
    type: UPDATE_EMPLOYEE_SUCCEED,
    data,
  }),
  updateEmployeeFail: (err) => ({
    type: UPDATE_EMPLOYEE_FAIL,
    err,
  }),

  toggleEmployee: (params, callback) => ({
    type: TOGGLE_EMPLOYEE,
    params,
    callback,
  }),
  toggleEmployeeFail: (err) => ({
    type: TOGGLE_EMPLOYEE_FAIL,
    err,
  }),
};
