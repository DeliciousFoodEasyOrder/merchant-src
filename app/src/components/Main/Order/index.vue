<template lang="pug">
  div.orders-container
    div.current-orders-container
      div.message-area
        span.current-orders-label 当前订单
          span.current-orders-num.mg-l-10 {{ (processingOrders && processingOrders.length) || 0}}
        span.message.mg-l-20(v-if="processingOrders.length > 0")
          i(class="fa fa-commenting-o fa-lg" aria-hidden="true")
          span.mg-l-5 有新订单了！
      div.current-orders
        current-order(v-for="(order, $index) in processingOrders" :currentOrder="order" :key="$index")
    div.history-orders-container.mg-t-10
      div.message-area
        span.current-orders-label 历史订单
      div.history-orders
        history-order(v-for="(order, $index) in completedOrders" :key="$index" :historyOrder="order").mg-t-10
</template>

<script>
import currentOrder from './currentOrder';
import historyOrder from './historyOrder';
import http from '../../../utils/network/http';
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState('merchant', ['merchant_id']),
    ...mapState('order', ['completedOrders', 'processingOrders']),
  },
  async created() {
    await this.getOrders(this.merchant_id);
  },
  components: {
    'current-order': currentOrder,
    'history-order': historyOrder
  },
  methods: {
    ...mapActions('order', ['getOrders'])
  }
};
</script>

<style scoped>
  .current-orders-container, .history-orders-container {
    padding: 15px;
    height: 45%;
  }
  .current-orders-label {
    font-size: 20px;
    font-weight: 500;
  }
  .current-orders-num {
    font-size: 20px;
    font-weight: bolder;
    color: red;
  }
  .current-orders {
    overflow: scroll;
    background: white;
    white-space: nowrap;
    height: 100%;
    border: solid 1px #cbcbca;
  }
  .current-order {
    display: inline-block;
    height: calc(100% - 20px);
    margin: 10px;
    width: 30%;
    background: #efefef;
    border: solid 1px #cbcbca;
    border-radius: 5px;
  }
  .message-area {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  .message {
    font-size: 18px;
    color: red;
  }
  .history-orders {
    overflow: scroll;
    background: white;
    white-space: nowrap;
    height: 100%;
    border: solid 1px #cbcbca;
    padding: 10px 20px;
  }
</style>
