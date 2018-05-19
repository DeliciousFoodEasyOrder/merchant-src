<template>
  <el-dialog title="添加菜品" :visible="outerVisible" @close="closeModal">
    <el-form ref="foodInfoForm" :rules="rules" :model="foodInfo">
      <el-form-item label="菜品名称" prop="name">
        <el-input v-model="foodInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="菜品价格" prop="price">
        <el-input type="number" min="0" v-model="foodInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="菜品描述" prop="description">
        <el-input type="textarea" resize="false" rows="3" v-model="foodInfo.description"></el-input>
      </el-form-item>
      <el-form-item label="菜品图片">
        <el-input type="file"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModal">关闭</el-button>
      <el-button type="primary" @click="addFood">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: ['outerVisible'],
    data() {
      return {
        foodInfo: {
          name: '',
          price: 0,
          description: ''
        },
        rules: {
          name: [
            { required: true, message: '菜品名称不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '菜名价格不能为空', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '菜品名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      closeModal() {
        this.$emit('closeModal');
      },
      addFood() {
        this.$refs.foodInfoForm.validate((valid) => {
          if (valid) {
            this.$emit('addFood', this.foodInfo);
            this.$refs.foodInfoForm.resetFields();
          }
        });
      }
    }
  }
</script>

<style scoped>
  .qrcode-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .qrcode {
    width: 40%;
    height: 40%;
  }
</style>
