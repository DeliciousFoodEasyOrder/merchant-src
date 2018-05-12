import axios from 'axios';
import store from '../../store/index';
import { notify } from '../messages/notify';

axios.interceptors.request.use(function (config) {
  const token = store.state.merchant.access_token;
  if (store.state.merchant.access_token) {
    return {...config, auth: {
      Bearer: token
    }};
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  const { msg } = error.response.data;
  notify({
    type: 'error',
    title: msg,
    duration: 1000
  });
  // 对响应错误做点什么
  return Promise.reject(error);
});

const http = {
  async createMerchant(merchant) {
    const res = await axios.post('/api/merchants', merchant);
    return res;
  },
  async login(loginInfo) {
    const res = await axios.post('/api/oauth/token', null, {params: loginInfo});
    return res;
  },
  async getOrders(merchantId) {
    const res = await axios.get('/api/orders', {
      params: {
        merchant_id: merchantId
      }
    });
    return res;
  }
}

export default http;

