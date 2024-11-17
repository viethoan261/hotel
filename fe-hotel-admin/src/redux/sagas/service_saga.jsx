import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { isFunction } from "lodash";
import rf from "../../requests/RequestFactory";
import utils from "../../utils";
import actions from "../actions/services";
import {
  ACTIVE_SERVICE,
  CREATE_SERVICE,
  GET_SERVICE,
  INACTIVE_SERVICE,
  ORDER_SERVICE,
  UPDATE_SERVICE,
} from "../actions/services/action_type";

function* getService(action) {
  try {
    const { data } = yield call(
      (params) => rf.getRequest("ServiceRequest").getService(params),
      action.params
    );
    yield put(actions.getServiceSucceed(data.data));
  } catch (err) {
    console.log(err);
    yield put(actions.getServiceFail(err));
  }
}

function* createService(action) {
  try {
    const { data } = yield call(
      (params) => rf.getRequest("ServiceRequest").createService(params),
      action.params
    );
    if (isFunction(action.callback)) {
      yield action.callback();
    }
    if (!data.hasErrors) {
      utils.showNotification(
        "Success",
        "Create service successfully!",
        "success"
      );
    }
  } catch (err) {
    console.log(err);
    yield put(actions.createServiceFail(err));
  }
}

function* updateService(action) {
  try {
    yield call(
      (params) => rf.getRequest("ServiceRequest").updateService(params),
      action.params
    );
    if (isFunction(action.callback)) {
      yield action.callback();
    }
    utils.showNotification("Success", "Update service successfully", "success");
  } catch (err) {
    console.log(err);
    yield put(actions.updateServiceFail(err));
  }
}

function* inactiveService(action) {
  try {
    yield call(
      (params) => rf.getRequest("ServiceRequest").inactiveService(params),
      action.params
    );
    if (isFunction(action.callback)) {
      yield action.callback();
    }
    utils.showNotification(
      "Warning",
      "Inactive service successfully",
      "warning"
    );
  } catch (err) {
    console.log(err);
    yield put(actions.inactiveServiceFail(err));
  }
}

function* activeService(action) {
  try {
    yield call(
      (params) => rf.getRequest("ServiceRequest").activeService(params),
      action.params
    );
    if (isFunction(action.callback)) {
      yield action.callback();
    }
    utils.showNotification("Success", "Active service successfully", "success");
  } catch (err) {
    console.log(err);
    yield put(actions.activeServiceFail(err));
  }
}

function* orderService(action) {
  try {
    const { data } = yield call(
      (params) => rf.getRequest("ServiceRequest").orderService(params),
      action.params
    );
    if (!data.hasErrors) {
      utils.showNotification(
        "Success",
        "Order service successfully!",
        "success"
      );
    }
  } catch (err) {
    console.log(err);
    yield put(actions.orderServiceFail(err));
  }
}
function* watchService() {
  yield takeLatest(GET_SERVICE, getService);
  yield takeLatest(UPDATE_SERVICE, updateService);
  yield takeLatest(CREATE_SERVICE, createService);
  yield takeLatest(UPDATE_SERVICE, updateService);
  yield takeLatest(INACTIVE_SERVICE, inactiveService);
  yield takeLatest(ACTIVE_SERVICE, activeService);
  yield takeLatest(ORDER_SERVICE, orderService);
}

export default function* rootSaga() {
  yield all([fork(watchService)]);
}
