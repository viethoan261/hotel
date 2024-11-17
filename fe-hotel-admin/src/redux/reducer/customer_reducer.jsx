import { GET_CUSTOMER_SUCCEED } from "../actions/customers/action_types";

export default (state = { customers: [] }, action) => {
  switch (action.type) {
    case GET_CUSTOMER_SUCCEED:
      return {
        ...state,
        customers: action.data,
      };
    default:
      return { ...state };
  }
};
