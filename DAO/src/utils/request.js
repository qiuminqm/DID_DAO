import axios from "axios";
import Vue from "vue";
import $router from "../router";
// http://192.168.1.10:5555/
// https://didapi.eotc.me/
// process.env.VUE_APP_LOCATION
const request = axios.create({
  baseURL: process.env.VUE_APP_LOCATION,
});
//请求拦截器
request.interceptors.request.use(
  (config) => {
    const wallet = {
      walletAddress: localStorage.getItem("myaddress"),
      otype: localStorage.getItem("netType"),
      sign: localStorage.getItem("mysign"),
    };
    wallet.otype = wallet.walletAddress.length == 34 ? 'trx' : 'bsc';
    config.data = Object.assign(config.data || {}, wallet);
    return config;
  },
  (error) => Promise.reject(error)
);

//响应拦截器
request.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const status = error.response?.status; // 响应状态码
    if (status === 400) {
      Vue.$toast.clear();
      Vue.$toast.error("客户端请求异常");
    } else if (status === 429) {
      //console.log(status)
      Vue.$toast.clear();
    } else if (status >= 500) {
      Vue.$toast.clear();
      Vue.$toast.error(status + " 服务器异常，请退出重新登录！");
      $router.replace({
        name: "error",
      });
    }
    return Promise.reject(error);
  }
);

export default request;
