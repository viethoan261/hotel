
import BaseRequest from "./BaseRequest";

const schema = "stats";

export default class StatisticRequest extends BaseRequest {
  getMonthlyStatistics() {
    const url = `${schema}/bills`;
    return this.get(url);
  }

  getRoomsStatistics() {
    const url = `${schema}/rooms`;
    return this.get(url);
  }

  getServicesStatistics() {
    const url = `${schema}/services`;
    return this.get(url);
  }
}
