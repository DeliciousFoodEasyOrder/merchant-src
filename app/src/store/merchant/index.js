import http from '../../utils/network/http';

const state = {
  merchant_id: '',
  phone: '',
  email: '',
  access_token: ''
};

const mutations = {
  setMerchant(state, {merchant_id, phone, email}) {
    state.merchant_id = merchant_id;
    state.phone = phone;
    state.email = email;
  },
  setToken(state, access_token) {
    state.access_token = access_token;
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
  }
};

export default {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations
};
