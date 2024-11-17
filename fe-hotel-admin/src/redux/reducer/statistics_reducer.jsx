import {
  GET_MONTHLY_STATISTICS_SUCCEED,
  GET_ROOMS_STATISTIC_SUCCEED,
  GET_SERVICE_STATISTIC_SUCCEED,
} from "../actions/statistics/action_type";

export default (
  state = { monthlyStat: [], roomsStat: [], servicesStat: [] },
  action
) => {
  switch (action.type) {
    case GET_MONTHLY_STATISTICS_SUCCEED:
      return {
        ...state,
        monthlyStat: action.data,
      };
    case GET_ROOMS_STATISTIC_SUCCEED:
      return {
        ...state,
        roomsStat: action.data,
      };
    case GET_SERVICE_STATISTIC_SUCCEED:
      return {
        ...state,
        servicesStat: action.data,
      };
    default:
      return state;
  }
};
