import {
  ADD_ROOM_SUCCEED,
  GET_ROOM_SUCCEED,
} from "../actions/rooms/action_types";

export default (state = { rooms: [] }, action) => {
  switch (action.type) {
    case GET_ROOM_SUCCEED:
      return {
        ...state,
        rooms: action.data,
      };

    case ADD_ROOM_SUCCEED: {
      return {
        ...state,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
