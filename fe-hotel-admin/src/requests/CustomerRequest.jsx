import BaseRequest from "./BaseRequest";

const schema = "";

export default class CustomerRequest extends BaseRequest {
  getCustomer() {
    const url = `clients`;
    return this.get(url);
  }
}
