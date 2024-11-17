import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import rf from "../../requests/RequestFactory";
import utils from "../../utils";
import actions from "../actions/statistics";
import {
  GET_MONTHLY_STATISTICS,
  GET_ROOMS_STATISTIC,
  GET_SERVICE_STATISTIC,
} from "../actions/statistics/action_type";

function* getMonthlyStats(action) {
  try {
    const { data } = yield call(
      (params) =>
        rf.getRequest("StatisticRequest").getMonthlyStatistics(params),
      action.params
    );
    yield put(actions.getMonthlyStatisticSucceed(data.data));
  } catch (err) {
    console.log(err);
    yield put(actions.getMonthlyStatisticFail(err));
  }
}

function* getRoomsStats(action) {
  try {
    const { data } = yield call(
      (params) => rf.getRequest("StatisticRequest").getRoomsStatistics(params),
      action.params
    );
    yield put(actions.getRoomsStatisticSucceed(data.data));
  } catch (err) {
    console.log(err);
    yield put(actions.getRoomsStatisticFail(err));
  }
}

function* getServicesStats(action) {
  try {
    const { data } = yield call(
      (params) =>
        rf.getRequest("StatisticRequest").getServicesStatistics(params),
      action.params
    );
    yield put(actions.getServicesStatisticSucceed(data.data));
  } catch (err) {
    console.log(err);
    yield put(actions.getServicesStatisticFail(err));
  }
}

function* watchStats() {
  yield takeLatest(GET_MONTHLY_STATISTICS, getMonthlyStats);
  yield takeLatest(GET_ROOMS_STATISTIC, getRoomsStats);
  yield takeLatest(GET_SERVICE_STATISTIC, getServicesStats);
}

export default function* rootSaga() {
  yield all([fork(watchStats)]);
}
