import { GET_BOOKING_SUCCEED } from "../actions/bookings/action_type";

export default (state = { bookings: [] }, action) => {
  switch (action.type) {
    case GET_BOOKING_SUCCEED:
      return {
        ...state,
        bookings: action.data,
      };
    default:
      return state;
  }
};
