import merchant from './merchant/index';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const storeSchema = {
  modules: {
    merchant
  }
}

const store = new Vuex.Store(storeSchema);

export default store;
