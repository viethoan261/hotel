import BaseRequest from "./BaseRequest";

const schema = "users";

export default class EmployeeRequest extends BaseRequest {
  getEmployee() {
    const url = `${schema}`;
    return this.get(url);
  }

  updateEmployee(params) {
    const url = `${schema}/${params.id}`;
    return this.put(url, params.body);
  }

  toggleEmployee(params) {
    const url = `${schema}/toggle?userId=${params.id}`;
    return this.get(url);
  }
}
