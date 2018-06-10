<template lang="pug">
  el-card(class="merchant-info-container")
    h3 商家信息
    div.merchant-info
      div.mg-bottom-10
        span 店名：
        span 那碗粉
      div.mg-bottom-10
        span 店长名：
        span 这碗粉
      div.mg-bottom-10
        span 地址：
        span 中山大学
      el-button(type="primary" size="small") 编辑信息
</template>

<script>
export default {
};
</script>

<style>
  .merchant-info-container {
    display: flex;
    justify-content: center;
  }
  .mg-bottom-10 {
    margin-bottom: 10px;
  }
</style>

