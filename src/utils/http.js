import axios from "axios";
import "nprogress/nprogress.css";
import nprogress from "nprogress";

const service = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
const BASEURL = require("api/base");

service.defaults.baseURL = process.env.NODE_ENV === "development" ? "/api" : BASEURL.production;

// 请求拦截器
const request = (config) => {
  nprogress.start();
  const token = "";
  if (token) config.headers.Authorization = token;
  return config;
};

const requestErr = (err) => {
  nprogress.start();
  console.log(err);
  return Promise.error(err);
};

// 响应拦截器
const response = (res) => {
  nprogress.done();
  if (res.status === 200) {
    return Promise.resolve(res);
  }
  return Promise.reject(res);
};

const responseErr = (err) => {
  nprogress.done();
  if (err.status) {
    switch (err.status) {
      case 401: // 未登录
        break;
      case 403: // token 过期
        break;
      case 404: // 请求不存在
        break;
      default:
        break;
    }
  }
  return Promise.reject(err);
};

service.interceptors.request.use(request, requestErr);
service.interceptors.response.use(response, responseErr);

export default service;
