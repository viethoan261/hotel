import BaseRequest from "./BaseRequest";

const schema = "rooms";

export default class RoomRequest extends BaseRequest {
  getRoom() {
    const url = `${schema}`;
    return this.get(url);
  }

  addRoom(params) {
    const url = `${schema}`;
    
    return this.post(url, params);
  }

  updateRoom(params) {
    const url = `${schema}/${params.roomId}`;
    return this.post(url, params.body);
  }

  blockRoom(params) {
    const url = `${schema}/${params}/block`;
    return this.post(url);
  }

  unblockRoom(params) {
    const url = `${schema}/${params}/unlock`;
    return this.post(url);
  }
}
