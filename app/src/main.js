// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import '../global.css';
import '../static/font-awesome-4.7.0/css/font-awesome.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import store from './store';

Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
});
