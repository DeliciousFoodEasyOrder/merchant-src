<template lang="pug">
  div.main
    el-menu(mode="horizontal").header
      el-menu-item(index="1000").logo
      el-menu-item(index="2000").title
          div.container
              p.app-name 好吃易点商家控制台
              p.merchant-name 传说中的那碗粉
    el-menu.sider
        el-menu-item(index="1" @click="goTo('Home')")
            i(class="fa fa-home fa-lg fa-fw" aria-hidden="true")
            span.mg-l-5 主页
        el-menu-item(index="2" @click="goTo('Table')")
            i(class="fa fa-cutlery fa-lg fa-fw" aria-hidden="true")
            span.mg-l-5 餐台管理
        el-menu-item(index="3" @click="goTo('')")
            i(class="fa fa-spoon fa-lg fa-fw" aria-hidden="true")
            span.mg-l-5 菜品管理
        el-menu-item(index="4" @click="goTo('Order')")
            i(class="fa fa-list-alt fa-lg fa-fw" aria-hidden="true")
            span.mg-l-5 订单
    router-view.content
</template>

<script>
export default {
  data() {
    return {
      data: null
    };
  },
  methods: {
    goTo(routeName) {
      this.$router.push(routeName);
    }
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
    .header > .el-menu-item {
        height: 70px;
        margin-bottom: 5px;
    }
    .logo {
        width: 100px;
        border-bottom-color: transparent !important;
        background: url('../../assets/logo.jpg');
        background-size: cover;
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
