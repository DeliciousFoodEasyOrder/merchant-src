import http from '../../utils/network/http';

const state = {
  foods: {}
};

const mutations = {
  setFoods(state, foods) {
    const foodsMap = {};
    foods.forEach((food) => {
      foodsMap[food.food_id] = food;
    });
    this.state.foods = foodsMap;
  }
};

const actions = {
  async getFoods({state}, merchantId) {
    try {
      const res = await http.getFoods(merchantId);
      console.log(res);
    } catch (e) {}
  },
  async addFood({state, commit}, payload) {
    try {
      const { data: { data } } = await http.addFood(payload);
      commit('setFoods', data);
    } catch (e) {}
  }
};

export default {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations
};
