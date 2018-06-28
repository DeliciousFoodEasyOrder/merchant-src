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
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :headers="headers"
          :on-exceed="handleExceed"
          :on-success="handleSuccess"
          :before-upload="handleBefore"
          :auto-upload="false"
          name="uploadFile"
          ref="upload"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>      
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModal">关闭</el-button>
      <el-button type="primary" @click="addFood">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    props: ['outerVisible'],
    data() {
      return {
        fileList: [],
        foodInfo: {
          name: '',
          price: 0,
          description: ''
        },
        food_id: '',
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
    computed: {
      ...mapState('merchant', ['merchant_id', 'access_token']),
      ...mapState('food', ['foods']),
      uploadUrl() {
        return `/api/foods/${this.food_id}/icon`;
      },
      headers() {
        return {
          Authorization: `Bearer ${this.access_token}`,
        }
      }
    },
    methods: {
      ...mapMutations('food', ['updateFood']),
      closeModal() {
        this.$emit('closeModal');
      },
      addFood() {
        this.$refs.foodInfoForm.validate((valid) => {
          if (valid) {
            this.$emit('addFood', this.foodInfo, this.uploadFile);
            this.$refs.foodInfoForm.resetFields();
          }
        });
      },
      uploadFile(food_id) 
      {
        this.food_id = food_id;
        setTimeout(() => {
          this.$refs.upload.submit();
        }, 0);
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePreview(file) {
        // console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSuccess(response) {
        const { data } = response;
        this.updateFood(data);
        this.fileList = [];
      },
      handleBefore(file) {
        // console.log(file);
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
