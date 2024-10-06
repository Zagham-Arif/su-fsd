import axios from "axios";

const APIResource = axios.create();

APIResource.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("error ...", error);
    return Promise.reject(error);
  }
);

APIResource.interceptors.response.use(
  (response) => {
    console.log("response...", response);
    return Promise.resolve(response?.data);
  },
  (error) => {
    console.error("error in response interceptor...", error);
    return Promise.reject(error);
  }
);

export { APIResource };
