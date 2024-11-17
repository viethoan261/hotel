import {
  GET_SERVICE,
  GET_SERVICE_SUCCEED,
} from "../actions/services/action_type";

export default (state = { service: [] }, action) => {
  switch (action.type) {
    case GET_SERVICE_SUCCEED:
      return {
        ...state,
        service: action.data,
      };
    default:
      return state;
  }
};
