import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { isFunction, take } from "lodash";
import rf from "../../requests/RequestFactory";
import utils from "../../utils";
import actions from "../actions/rooms";
import { ADD_ROOM, BLOCK_ROOM, GET_ROOM, UNBLOCK_ROOM, UPDATE_ROOM } from "../actions/rooms/action_types";

function* getRoom(action) {
  try {
    const { data } = yield call((params) => rf.getRequest("RoomRequest").getRoom(params), action.params);
    yield put(actions.getRoomSucceed(data.data));
  } catch (err) {
    console.log(err);
    yield put(actions.getRoomFail(err));
  }
}

function* addRoom(action) {
  try {
    yield call((params) => rf.getRequest("RoomRequest").addRoom(params), action.params);
    console.log(action.params);
    if (isFunction(action.callback)) {
      yield action.callback();
    }
    utils.showNotification("Success", "Add new room successfully", "success");
  } catch (err) {
    console.log(err);
    yield put(actions.addRoomFail(err));
  }
}

function* updateRoom(action) {
  try {
    yield call((params) => rf.getRequest("RoomRequest").updateRoom(params), action.params);
    if (isFunction(action.callback)) {
      yield action.callback();
    }
    utils.showNotification("Success", "Update room successfully", "success");
  } catch (err) {
    console.log(err);
    yield put(actions.udpateRoomFail(err));
  }
}

function* blockRoom(action) {
  try {
    yield call((params) => rf.getRequest("RoomRequest").blockRoom(params), action.params);
    if (isFunction(action.callback)) {
      yield action.callback();
    }
    utils.showNotification("Warning", "Block room successfully", "warning");
  } catch (err) {
    console.log(err);
    yield put(actions.blockRoomFail(err));
  }
}

function* unblockRoom(action) {
  try {
    yield call((params) => rf.getRequest("RoomRequest").unblockRoom(params), action.params);
    if (isFunction(action.callback)) {
      yield action.callback();
    }
    utils.showNotification("Warning", "Unblock room successfully", "warning");
  } catch (err) {
    console.log(err);
    yield put(actions.unblockRoomFail(err));
  }
}

function* watchRooms() {
  yield takeLatest(ADD_ROOM, addRoom);
  yield takeLatest(GET_ROOM, getRoom);
  yield takeLatest(UPDATE_ROOM, updateRoom);
  yield takeLatest(BLOCK_ROOM, blockRoom);
  yield takeLatest(UNBLOCK_ROOM, unblockRoom);
}

export default function* rootSaga() {
  yield all([fork(watchRooms)]);
}
