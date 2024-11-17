import BaseRequest from "./BaseRequest";

const schema = "services";

export default class ServiceRequest extends BaseRequest {
  getService(param) {
    const url = `${schema}/`;
    return this.get(url, param);
  }

  createService(param) {
    const url = `${schema}/`;

    return this.post(url, param.data);
  }

  updateService(param) {
    const url = `${schema}/${param.data.id}`;
    return this.post(url, param.data.data);
  }

  inactiveService(param) {
    const url = `${schema}/${param.data}/in-active`;
    return this.post(url);
  }
  activeService(param) {
    const url = `${schema}/${param.data}/active`;
    return this.post(url);
  }

  orderService(param) {
    const url = `${schema}/${param.data.bookingId}/order`;
    return this.post(url, param.data.body);
  }
}
