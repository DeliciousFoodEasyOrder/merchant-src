<template lang="pug">
  div
    div.header
      span 菜单
      el-button(type="text" @click="showAddFoodModal").mg-l-20
        i(class="fa fa-plus fa-2x" aria-hidden="true")
    div.food-container
      el-card(v-for="foodId in foodIds" shadow="hover" :body-style="elCardBodyStyle" :key="foodId").food
        el-button(type="text" @click="deleteFoodConfirm(foods[foodId].food_id)").delete-btn
          i(class="fa fa-times-circle fa-2x" aria-hidden="true")
        img.food-img(:src="`/api/${foods[foodId].icon_url}`")
        div.food-info
          div.food-title {{foods[foodId].name}}
          div.food-price ¥ {{foods[foodId].price}}
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
    }
  },
  created() {
    this.getFoods(this.merchant_id);
  },
  computed: {
    ...mapState('merchant', ['merchant_id']),
    ...mapState('food', ['foods']),
    foodIds() {
      return Object.keys(this.foods);
    }
  },
  methods: {
    ...mapActions('food', ['addFood', 'getFoods', 'deleteFood']),
    showAddFoodModal() {
      this.isShowAddFoodModal = true;
    },
    hideAddFoodModal() {
      this.isShowAddFoodModal = false;
    },
    async addFoodAndCloseModal(foodInfo, upload) {
      const res = await this.addFood({...foodInfo, merchant_id: this.merchant_id}) || {};
      upload(res.food_id);
      this.hideAddFoodModal();
    },
    async deleteFoodConfirm(foodId) {
      this.$confirm('是否删除该菜品？')
        .then(()=> {
          this.deleteFood(foodId);
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
    width: 120px;
    height: 120px;
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

