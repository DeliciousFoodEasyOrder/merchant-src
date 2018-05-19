import axios from 'axios';
import store from '../../store/index';
import { notify } from '../messages/notify';

axios.interceptors.request.use(function(config) {
  const token = store.state.merchant.access_token;
  if (store.state.merchant.access_token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  // 在发送请求之前做些什么
  return config;
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  return response;
}, function(error) {
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
  },
  /**
   *
   * @param {*} id // 电话或者邮箱
   */
  async getMerchant(id) {
    const res = await axios.get('/api/merchants', { params: { phone: id } });
    const { data: { data } } = res;
    return data;
  },

  async getSeats(id) {
    const res = await axios.get('/api/seats', { params: { merchant_id: id } });
    return res;
  },

  async addSeat(payload) {
    const res = await axios.post('/api/seats', payload);
    return res;
  },

  async deleteSeat(seatId) {
    const res = await axios.delete(`/api/seats/${seatId}`);
    return res;
  },

  async addFood({ name, price, description, merchant_id: merchantId }) {
    const res = await axios.post('/api/foods', {
      price: parseFloat(price),
      name,
      description,
      food_id: null,
      merchant_id: merchantId
    });
    return res;
  },

  async getFoods(merchantId) {
    const res = await axios.get('/api/foods', {
      params: {
        merchant_id: merchantId
      }
    });
    return res;
  },

  async deleteFood(foodId) {
    const res = await axios.delete(`/api/foods/${foodId}`);
    return res;
  }
};

export default http;
