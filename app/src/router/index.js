import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Regist from '@/components/Regist';
import Main from '@/components/Main';
import Home from '@/components/Main/Home';
import Table from '@/components/Main/Table';
import Order from '@/components/Main/Order';
import Food from '@/components/Main/Food';

import store from '../store/index';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/regist',
      name: 'Regist',
      component: Regist
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      beforeEnter: (to, from, next) => {
        if (store.state.merchant.access_token !== '') {
          next();
        } else {
          next('login');
        }
      },
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'table',
          name: 'Table',
          component: Table
        },
        {
          path: 'order',
          name: 'Order',
          component: Order
        },
        {
          path: 'food',
          name: 'Food',
          component: Food
        }
      ]
    }
  ]
});

export default router;
