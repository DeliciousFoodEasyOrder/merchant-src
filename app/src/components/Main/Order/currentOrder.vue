<template lang="pug">
  div.current-order
    el-button(circle) 1D
    span.order-id.mg-l-10 订单号 1111111111111111
    div.mg-t-10
      span.ordered-time 2018-01-12 12:20
      span.food-kinds 2个菜
    div.food-list.mg-t-10
      div.food
        img.food-img(src="http://fuss10.elemecdn.com/d/04/4ab88995116d0ea8eb4dbbaa53f0ejpeg.jpeg?imageMogr2/thumbnail/720x720/format/webp/quality/85")
        span.food-name.mg-l-20 桂林米粉
      div.food
        img.food-img(src="https://fuss10.elemecdn.com/9/bf/43e73ac46499246c16555337a2127jpeg.jpeg?imageMogr2/thumbnail/720x720/format/webp/quality/85")
        span.food-name.mg-l-20 冰淇淋
    el-button.btn(type="danger") 完成
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
