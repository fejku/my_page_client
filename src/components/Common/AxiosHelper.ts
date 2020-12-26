import axios from "axios";
import AuthHeader from "../../services/AuthHeader";

const contentType = (method: string | undefined) => {
  if (method && method.toLocaleUpperCase() === "POST") {
    return { "Content-Type": "application/json" };
  }
  return {};
};

const myAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

myAxios.interceptors.request.use(
  (config) => {
    config.headers = { ...config.headers, ...contentType(config.method), ...AuthHeader.getAuthHeader() };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default myAxios;
