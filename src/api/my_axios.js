import axios from "axios";
import nprogress from 'nprogress'
import "nprogress/nprogress.css"

let requests = axios.create({
  // baseURL: 'https://netease-cloud-api-pink.vercel.app',
  baseURL: 'http://localhost:3000',
  timeout: 7000
})

requests.interceptors.request.use((config) => {
  // if (config.url.indexOf('?') !== -1)
  //   config.url += '&realIP=10.33.38.171';   // 因为部署在vercel上，所以添加这一个参数
  // else {
  //   config.url += '?realIP=10.33.38.171';
  // }
  nprogress.start();
  return config;
})

requests.interceptors.response.use((res) => {
  nprogress.done();
  return res.data;
}, () => {
  alert('服务器响应数据失败，请刷新后再试！');
})

export default requests;