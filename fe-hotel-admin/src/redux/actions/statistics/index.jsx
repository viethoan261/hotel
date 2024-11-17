import {
  GET_MONTHLY_STATISTICS,
  GET_MONTHLY_STATISTICS_FAIL,
  GET_MONTHLY_STATISTICS_SUCCEED,
  GET_ROOMS_STATISTIC,
  GET_ROOMS_STATISTIC_FAIL,
  GET_ROOMS_STATISTIC_SUCCEED,
  GET_SERVICE_STATISTIC,
  GET_SERVICE_STATISTIC_FAIL,
  GET_SERVICE_STATISTIC_SUCCEED,
} from "./action_type";

export default {
  getMonthlyStatistic: (params) => ({
    type: GET_MONTHLY_STATISTICS,
    params,
  }),
  getMonthlyStatisticSucceed: (data) => ({
    type: GET_MONTHLY_STATISTICS_SUCCEED,
    data,
  }),
  getMonthlyStatisticFail: (err) => ({
    type: GET_MONTHLY_STATISTICS_FAIL,
    err,
  }),

  getRoomsStatistic: (params) => ({
    type: GET_ROOMS_STATISTIC,
    params,
  }),
  getRoomsStatisticSucceed: (data) => ({
    type: GET_ROOMS_STATISTIC_SUCCEED,
    data,
  }),
  getRoomsStatisticFail: (err) => ({
    type: GET_ROOMS_STATISTIC_FAIL,
    err,
  }),

  getServicesStatistic: (params) => ({
    type: GET_SERVICE_STATISTIC,
    params,
  }),
  getServicesStatisticSucceed: (data) => ({
    type: GET_SERVICE_STATISTIC_SUCCEED,
    data,
  }),
  getServicesStatisticFail: (err) => ({
    type: GET_SERVICE_STATISTIC_FAIL,
    err,
  }),
};
