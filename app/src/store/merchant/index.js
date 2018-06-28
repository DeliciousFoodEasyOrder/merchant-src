import http from '../../utils/network/http';

const state = {
  merchant_id: '',
  phone: '',
  email: '',
  access_token: '',
  isOnline: 0,
  address: '',
  tradeName: '',
  iconUrl: ''
};

const mutations = {
  setMerchant(state, {merchant_id: merchantId, phone, email, on, name, address, icon_url: iconUrl}) {
    state.merchant_id = merchantId;
    state.phone = phone;
    state.email = email;
    state.isOnline = on !== 1;
    state.address = address;
    state.tradeName = name;
    state.icon_url = iconUrl;
  },
  setToken(state, accessToken) {
    state.access_token = accessToken;
  },
  setIcon(state, iconUrl) {
    state.icon_url = iconUrl;
  }
};

const actions = {
  async login({ state, commit }, merchant) {
    const res = await http.login({
      grant_type: 'password',
      username: merchant.id,
      password: merchant.password
    });
    return res;
  },
  async getMerchant({ state, commit }, id) {
    const res = await http.getMerchant(id);
    return res;
  },
  async updateMerchant({ state, commit }, payload) {
    const { id, patch } = payload;
    const res = await http.updateMerchant(id, patch);
    const { data: { data } } = res;
    commit('setMerchant', data);
    return res;
  }
};

export default {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations
};
