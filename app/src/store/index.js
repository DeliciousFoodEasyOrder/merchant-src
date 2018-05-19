import merchant from './merchant/index';
import table from './table/index';
import food from './food/index';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const storeSchema = {
  modules: {
    merchant,
    table,
    food
  }
};

const store = new Vuex.Store(storeSchema);

export default store;
