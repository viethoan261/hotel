import { all } from "redux-saga/effects";
import watchBooking from "./booking_saga";
import watchAllUsers from "./login_saga";
import watchAllRooms from "./room_saga";
import watchService from "./service_saga";
import watchStats from "./stats_saga";
import watchEmployee from "./employee_saga";
import watchCustomer from "./customer_saga";
function* rootSaga() {
  yield all([watchAllUsers(), watchAllRooms(), watchBooking(), watchService(), watchStats(), watchEmployee(), watchCustomer()]);
}

export default rootSaga;
