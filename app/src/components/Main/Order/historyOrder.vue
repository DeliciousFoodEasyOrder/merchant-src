<template lang="pug">
  div.history-order
    div.order-info
      el-button(circle) 座位号 {{historyOrder.seat_id}}
      span.mg-l-10.order-id 订单号 {{historyOrder.order_id}}
      div.place-order-time.mg-t-10
        span 下单于 {{historyOrder.order_time}}
      div.accomplish-order-time
        span 完成于 {{historyOrder.complete_time}}
    div.food-imgs-list
      img.food-img.mg-l-20(v-for="(food, $index) in historyOrder.foods" :src="food.icon_url !== '' ? `/api/${food.icon_url}` : '/static/images/food.jpeg'")
</template>

<script>
// import http from '../../../utils/network/http';
export default {
  props: ['historyOrder'],
  // async created() {
  //   await http.updateOrder(9, 2);
  // },
  data() {
    return {
      data: []
    };
  },
  // filters: {
    
  // }
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
