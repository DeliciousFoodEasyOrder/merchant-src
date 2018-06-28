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
    state.foods = foodsMap;
  },
  addFood(state, food) {
    const foods = state.foods;
    foods[food.food_id] = food;
    state.foods = {...foods};
  },
  updateFood(state, food) {
    state.foods[food.food_id] = food;
  }
};

const actions = {
  async getFoods({state, commit}, merchantId) {
    try {
      const { data: { data } } = await http.getFoods(merchantId);
      commit('setFoods', data);
    } catch (e) {}
  },
  async addFood({state, commit}, payload) {
    try {
      const { data: { data } } = await http.addFood(payload);
      commit('addFood', data);
      return data;
    } catch (e) {}
  },
  async deleteFood({state, commit}, foodId) {
    try {
      await http.deleteFood(foodId);
      const foods = state.foods;
      delete foods[foodId];
      state.foods = {...foods};
    } catch (e) {
    }
  }
};

export default {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations
};
