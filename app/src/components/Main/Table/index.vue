<template lang="pug">
  div
    div.tables-control-bar-contaienr
      div.tables-control-bar
        p
          span.tables-account.mg-l-40 3
          span.mg-l-20 餐台
          span.seats-account.mg-l-40 12
          span.mg-l-20 座位
        div.add-table
          el-button(type="text")
            i(class="fa fa-plus fa-3x" aria-hidden="true")
    div.tables-contaienr
      div(v-for="(table, $index) in tables").table
        div.seats-control-bar
          span.table-label 餐台 {{$index + 1}}
          el-button(type="text").mg-l-20
            i(class="fa fa-plus fa-2x" aria-hidden="true")
          el-button(type="text").mg-l-20.danger
            i(class="fa fa-minus fa-2x" aria-hidden="true")
          el-button(type="text").mg-l-20
            i(class="fa fa-qrcode fa-2x" aria-hidden="true")
          el-button(type="text").mg-l-20.danger
            i(class="fa fa-times fa-2x" aria-hidden="true")
        div.seats-contaienr
          el-button(circle v-for="(seat, $index) in table.seats" :key="$index").seat
            span 1A
</template>

<script>
export default {
  data() {
    return {
      tables: [
        {
          seats: [1, 2, 3, 4]
        },
        {
          seats: [1, 2, 3, 4]
        },
        {
          seats: [1, 2, 3, 4]
        },
        {
          seats: [1, 2, 3, 4]
        }
      ]
    };
  }
};
</script>

<style scoped>
    .tables-control-bar-contaienr {
        padding: 15px;
        width: cal(100% - 30px);
    }
    .tables-control-bar {
        border: solid 1px #cbcbca;
        position: relative;
        background: white;
        height: 70px;
        display: flex;
        align-items: center;
    }
    .seats-account, .tables-account {
        font-size: 40px;
        font-weight: bold;
    }
    .add-table {
        position: absolute;
        right: 20px;
    }
    .tables-contaienr {
      padding: 15px;
      width: cal(100% - 30px);
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
    .table {
        margin: 0px 5px 20px 5px;
        width: 30%;
        min-width: 166px;
        display: inline-block;
        background: white;
        border: solid 1px #cbcbca;
        padding: 20px 10px 10px;
    }
    .table-label {
      font-size: 23px;
      font-weight: 500;
    }
    .seats-control-bar {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .danger {
      color: red;
    }
    .seats-contaienr {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    .seat {
      width: 80px;
      height: 80px;
      margin: 10px;
    }
</style>
