<template lang="pug">
  div.history-order
    div.order-info
      el-button(circle) 1D
      span.mg-l-10.order-id 订单号 1111111111111111111
      div.place-order-time.mg-t-10
        span 下单于 2018-01-01 14:00
      div.accomplish-order-time
        span 完成于 2018-01-01 14:01
    div.food-imgs-list
      img.food-img.mg-l-20(src="http://fuss10.elemecdn.com/d/04/4ab88995116d0ea8eb4dbbaa53f0ejpeg.jpeg?imageMogr2/thumbnail/720x720/format/webp/quality/85")
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  }
};
</script>

<style scoped>
  .history-order {
    overflow: auto;
  }
  .order-info {
    float: left;
    width: 30%;
    overflow: scroll;
    margin-right: 20px;
  }
  .place-order-time, .accomplish-order-time {
    font-size: small;
    color: #909399;
  }
  .food-img {
    width: 100px;
    height: 100px;
  }
</style>
