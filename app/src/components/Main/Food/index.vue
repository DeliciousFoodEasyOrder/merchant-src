<template lang="pug">
  div
    div.header
      span 菜单
      el-button(type="text" @click="showAddFoodModal").mg-l-20
        i(class="fa fa-plus fa-2x" aria-hidden="true")
    div.food-container
      el-card(v-for="(food, index) in foods" shadow="hover" :body-style="elCardBodyStyle" :key="index").food
        el-button(type="text" @click="deleteFoodConfirm(food.food_id)").delete-btn
          i(class="fa fa-times-circle fa-2x" aria-hidden="true")
        img.food-img(src="http://fuss10.elemecdn.com/d/04/4ab88995116d0ea8eb4dbbaa53f0ejpeg.jpeg?imageMogr2/thumbnail/720x720/format/webp/quality/85")
        div.food-info
          div.food-title 招牌牛杂粉
          div.food-price ¥ 15.3
    addFoodModal(:outerVisible="isShowAddFoodModal" @closeModal="hideAddFoodModal" @addFood="addFoodAndCloseModal")  
</template>

<script>
import addFoodModal from './addFoodModal';
import { mapActions, mapState } from 'vuex';
export default {
  components: {
    addFoodModal
  },
  data() {
    return {
      isShowAddFoodModal: false,
      elCardBodyStyle: {
        overflow: 'hidden',
        'box-sizing': 'border-box',
        'height': '100%'
      },
      foods: [1, 2, 3]
    }
  },
  created() {
    this.getFoods(this.merchant_id);
  },
  computed: {
    ...mapState('merchant', ['merchant_id'])
  },
  methods: {
    ...mapActions('food', ['addFood', 'getFoods']),
    showAddFoodModal() {
      this.isShowAddFoodModal = true;
    },
    hideAddFoodModal() {
      this.isShowAddFoodModal = false;
    },
    async addFoodAndCloseModal(foodInfo) {
      await this.addFood({...foodInfo, merchant_id: this.merchant_id});
      this.hideAddFoodModal();
    },
    async deleteFoodConfirm(foodId) {
      this.$confirm('是否删除该菜品？')
        .then(()=> {
          console.log('jajaj');
        }).catch(() => {});
    }
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    margin-left: 20px;
    font-size: 25px;
    font-weight: 500;
  }
  .food-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
  }
  .food {
    width: 30%;
    min-width: 337px;    
    margin: 10px;
    position: relative;
  }
  .food-img {
    width: 40%;
    float: left;
    margin-right: 20px;    
  }
  .food-info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .food-title {
    font-size: 18px;
    font-weight: 500;
  }
  .food-price {
    font-size: 18px;
    color: rgb(226, 19, 19);
  }
  .delete-btn {
    font-size: 10px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
</style>

