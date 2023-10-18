import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

enum RequestMethods {
  GET,
  PUT,
  POST,
  PATCH,
  DELETE,
}

const request = async (method: RequestMethods, url: string, data?: any) => {
  return api.request({
    method: method.toString(),
    url,
    data,
  });
};

export { api, RequestMethods, request };
