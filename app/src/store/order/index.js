import http from '../../utils/network/http';
import { notify } from '../../utils/messages/notify';

const state = {
  processingOrders: [],
  completedOrders: [],
  allOrders: []
};

const mutations = {
};

const actions = {
  async getOrders({ state }, merchantId) {
    const res = await http.getOrders(merchantId);
    const { data: { data: orders = [] } } = res;
    state.allOrders = orders;
    const lastProcessingOrders = [...state.processingOrders];
    state.completedOrders = [];
    state.processingOrders = [];
    orders.forEach((order) => {
      if (order.status === 1) {
        state.completedOrders.push(order);
      } else {
        state.processingOrders.push(order);
      }
    });
    if (lastProcessingOrders.length < state.processingOrders.length) {
      notify({ type: 'success', title: '您有新的订单', message: '', duration: 2000 });
    }
  }
};

export default {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations
};
