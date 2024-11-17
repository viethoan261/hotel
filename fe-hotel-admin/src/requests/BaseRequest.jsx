import { BASE_URL } from "../config/consts";
import React from "react";
import { get } from "lodash";
import axios from "../config/axios";
import utils from "../utils";
export default class BaseRequest {
  version = "v1";

  prefix() {
    return "";
  }

  async get(url, params = {}) {
    try {
      const response = await axios.get(`${BASE_URL}/${this.version}/${url}`, {
        params,
      });
      return response;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async put(url, data = {}) {
    try {
      const response = await axios.put(
        `${BASE_URL}/${this.version}/${url}`,
        data
      );
      return response;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async post(url, data = {}) {
    try {
      const response = await axios.post(
        `${BASE_URL}/${this.version}/${url}`,
        data
      );
      return response;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async del(url, params = {}) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/${this.version}/${url}`,
        params
      );
      return response;
    } catch (error) {
      return this.errorHandler(error);
    }
  }

  responseHanlder(response) {
    const { data } = response;
    return data;
  }

  errorHandler(error) {
    if (error.response) {
      console.log(error.response.data); // => the response payload
      utils.showNotification("Error", error.response.data.errors, "error");
    }
    return error;
  }
}
