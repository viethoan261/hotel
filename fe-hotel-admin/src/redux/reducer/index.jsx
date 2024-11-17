import { combineReducers } from "redux";
import login_reducer from "./login_reducer";
import room_reducer from "./room_reducer";
import booking_reducer from "./booking_reducer";
import service_reducer from "./service_reducer";
import statistics_reducer from "./statistics_reducer";
import employee_reducer from "./employee_reducer";
import customer_reducer from "./customer_reducer";

const allReducers = combineReducers({
  login_reducer,
  room_reducer,
  booking_reducer,
  service_reducer,
  statistics_reducer,
  employee_reducer,
  customer_reducer,
});

export default allReducers;
