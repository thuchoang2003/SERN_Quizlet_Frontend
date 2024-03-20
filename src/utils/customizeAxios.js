import axios from "axios";
import NProgress from "nprogress";
import { store } from "../../src/redux/store.js";

const instance = axios.create({
  // baseURL: "https://quizlet-backend.nhodev.xyz/api/v1/",
  // baseURL: "http://localhost:6789/api/v1/",
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  withCredentials: true,
});

const handleRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  let response = await instance.post("/auth/refresh", {
    refreshToken: refreshToken,
  });
  if (response) {
    return response.token.access.token;
  } else return null;
};
instance.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["Authorization"] =
      "Bearer " + localStorage.getItem("access_token");

    NProgress.start();
    return config;
  },
  function (error) {
    // Do something with request error
    NProgress.done();
    return Promise.reject(error);
  }
);
const NO_RETRY_HEADER = "x-no-retry";
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    return response && response.data ? response.data : response;
  },
  async function (error) {
    NProgress.done();
    const status = error.response ? error.response.status : null;

    // if (status === 401 && !error.config.headers[NO_RETRY_HEADER]) {
    //   const access_token = await handleRefreshToken();
    //   error.config.headers[NO_RETRY_HEADER] = "true";
    //   error.config.headers["Authorization"] = "Bearer " + access_token;
    //   localStorage.setItem("access_token", access_token);
    //   return instance.request(error.config);
    // }
    // if (status === 400 && error.config.url === "/api/v1/auth/refresh") {
    //   window.location.href = "/login";
    // }

    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);
export default instance;
