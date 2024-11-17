import {
  GET_CUSTOMER,
  GET_CUSTOMER_FAIL,
  GET_CUSTOMER_SUCCEED,
} from "./action_types";

export default {
  getCustomer: (data) => ({
    type: GET_CUSTOMER,
    params: {
      data,
    },
  }),
  getCustomerSucceed: (data) => ({
    type: GET_CUSTOMER_SUCCEED,
    data,
  }),
  getCustomerFail: (err) => ({
    type: GET_CUSTOMER_FAIL,
    err,
  }),
};
