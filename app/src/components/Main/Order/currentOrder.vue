<template lang="pug">
  div.current-order
    el-button(circle) 座位号 {{ currentOrder.seat_id }}
    span.order-id.mg-l-10 订单号 {{ currentOrder.order_id }}
    div.mg-t-10
      span.ordered-time {{ currentOrder.order_time }}
      span.food-kinds {{currentOrder.foods.length}}个菜
    div.food-list.mg-t-10
      div.food(v-for="(food, $index) in currentOrder.foods")
        img.food-img(src="http://fuss10.elemecdn.com/d/04/4ab88995116d0ea8eb4dbbaa53f0ejpeg.jpeg?imageMogr2/thumbnail/720x720/format/webp/quality/85")
        span.food-name.mg-l-20 {{food.name}}
    el-button.btn(type="danger", @click="updateOrder(currentOrder.order_id, 1)") 完成
</template>

<script>
import http from '../../../utils/network/http';
export default {
  props: ['currentOrder'],
  data() {
    return {
      data: []
    };
  },
  methods: {
    updateOrder(orderId, status) {
      http.updateOrder(orderId, status);
    }
  }
};
</script>

<style scoped>
  .current-order {
    display: inline-block;
    height: calc(100% - 50px);
    margin: 10px;
    padding: 20px 10px 10px 20px;
    width: 30%;
    background: #efefef;
    border: solid 1px #cbcbca;
    border-radius: 5px;
    overflow: scroll;
  }
  .order-id {
    font-weight: 500;
  }
  .ordered-time {
    font-size: small;
  }
  .food {
    margin: 10px 0;
    display: flex;
    align-items: center;
  }
  .food-kinds {
    font-weight: 500;
    float: right;
  }
  .food-img {
    width: 100px;
    height: 100px;
  }
  .btn {
    width: 100%;
  }
</style>
