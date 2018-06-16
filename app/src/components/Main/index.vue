<template lang="pug">
  div.main
    el-menu(mode="horizontal").header
      el-menu-item(index="1000").logo
      el-menu-item(index="2000").title
        div.container
          p.app-name 好吃易点商家控制台
          p.merchant-name {{tradeName}}
      el-menu-item(index="3000").logout-button-positioner
        el-button(size="small" @click="goTo('login')") 退出登录
    el-menu.sider
        el-menu-item(index="1" @click="goTo('home')")
            i(class="fa fa-home fa-lg fa-fw" aria-hidden="true")
            span.mg-l-5 主页
        el-menu-item(index="2" @click="goTo('table')" :disabled="!isOnline")
            i(class="fa fa-cutlery fa-lg fa-fw" aria-hidden="true")
            span.mg-l-5 餐台管理
        el-menu-item(index="3" @click="goTo('food')" :disabled="!isOnline")
            i(class="fa fa-spoon fa-lg fa-fw" aria-hidden="true")
            span.mg-l-5 菜品管理
        el-menu-item(index="4" @click="goTo('order')" :disabled="!isOnline")
            i(class="fa fa-list-alt fa-lg fa-fw" aria-hidden="true")
            span.mg-l-5 订单
    router-view.content
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
export default {
  created() {
    this.timer = setInterval(this.pollingOrders, 1000);
  },
  computed: {
    ...mapState('merchant', ['merchant_id', 'tradeName', 'isOnline']),
  },
  data() {
    return {
      timer: null,
    };
  },
  methods: {
    ...mapActions('order', ['getOrders']),
    goTo(routeName) {
      this.$router.push(routeName);
    },
    pollingOrders() {
      this.getOrders(this.merchant_id);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
    .main {
        height: 100%;
        background: #efefef;
        margin: 0;
        overflow: scroll;
    }
    .header {
        z-index: 1000;
    }
    .header > li {
      margin: 0 !important;
    }
    .header > .el-menu-item {
      height: 70px;
      margin-bottom: 5px;
    }
    .header .logout-button-positioner {
      float: right !important;
      display: flex;
      align-items: center;
        border-bottom-color: transparent !important;
    }
    .logo {
        width: 100px;
        border-bottom-color: transparent !important;
        background: url('../../assets/logo.jpeg');
        background-size: cover;
        background-repeat: no-repeat;
    }
    .title {
        line-height: 30px !important;
        border-bottom-color: transparent !important;
    }
    .container {
        text-align: center;
        padding-top: 10px;
    }
    .app-name {
        color: black !important;
        margin: 0;
        font-size: 13px;
    }
    .merchant-name {
        margin: 0;
        color: black !important;
        font-size: 18px;
        font-weight: 600;
    }
    .sider {
        width: 12%;
        height: calc(100% - 75px);
        padding-top: 75px;
        text-align: left;
        position: fixed;
        top: 0;
    }
    .content {
        margin-left: 12%;
        height: calc(100% - 75px);
        width: 88%;
    }
    .mg-l-5 {
        margin-left: 5px;
    }
</style>
