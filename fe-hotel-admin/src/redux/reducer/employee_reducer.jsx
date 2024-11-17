import { GET_EMPLOYEE_SUCCEED } from "../actions/employees/action_types";

export default (state = { employees: [] }, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_SUCCEED:
      return {
        ...state,
        employees: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};
