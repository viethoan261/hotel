import BaseRequest from "./BaseRequest";

const schema = "auth";

export default class LoginRequest extends BaseRequest {
  register(params) {
    const url = `${schema}/register`;
    return this.post(url, params.data);
  }

  login(params) {
    const url = `${schema}/login`;
    return this.post(url, params);
  }
}
