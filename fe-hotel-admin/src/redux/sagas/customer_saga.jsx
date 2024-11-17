import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import rf from "../../requests/RequestFactory";
import utils from "../../utils";
import actions from "../actions/customers";
import { GET_CUSTOMER } from "../actions/customers/action_types";

function* getCustomer(action) {
  try {
    const { data } = yield call((params) => rf.getRequest("CustomerRequest").getCustomer(params), action.params);
    yield put(actions.getCustomerSucceed(data.data));
  } catch (err) {
    console.log(err);
    yield put(actions.getCustomerFail(err));
  }
}

function* watchCustomer() {
  yield takeLatest(GET_CUSTOMER, getCustomer);
}

export default function* rootSaga() {
  yield all([fork(watchCustomer)]);
}
