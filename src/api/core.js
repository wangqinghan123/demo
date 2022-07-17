import axios from "axios";

import API from "./config";

//axios实例
let basUrl = "";
if (_WebSocket.enableBaseUrl == true) {
  basUrl = _WebSocket.BaseUrl;
} else {
  if (window.location.port != "") {
    basUrl =
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      window.location.port;
  } else {
    basUrl = window.location.protocol + "//" + window.location.hostname;
  }
}
const instance = axios.create({
  baseURL: basUrl,
  changeOrigin: true,
  timeout: 5000, //超时时间
});

// 添加请求超时拦截器

instance.interceptors.request.use(
  function(config) {
    let sp = document.cookie.split("token")[1].split(";")[0];

    let token = sp.substr(1, sp.length);

    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  function(error) {
    if (error.response.status == 401) {
      console.log("请求头失败");
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    console.log("响应失败");

    return Promise.reject(error);
  }
);
//判断是那种类型的请求：Post、Get、Put、delete
export function request(method, url, params, config) {
  switch (method) {
    case API.Method.Get:
      return Get(url, params);
    case API.Method.Post:
      return Post(url, params);
    case API.Method.Put:
      return Put(url, params);
    case API.Method.Del:
      return Del(url, params);
    default:
      instance(config);
  }
}
function Get(url, params) {
  return instance.get(url, params);
}

function Post(url, params) {
  return instance.post(url, params);
}
function Put(url, params) {
  return instance.put(url, params);
}
function Del(url, params) {
  return instance.delete(url, params);
}
