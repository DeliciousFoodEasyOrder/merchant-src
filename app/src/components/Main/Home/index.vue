<template lang="pug">
  el-card(class="merchant-info-container")
    h3 商家信息
    div.merchant-info
      div.mg-bottom-10
        span 店名：
        span {{this.tradeName}}
      div.mg-bottom-10
        span 地址：
        span {{this.address}}
      el-button(type="primary" size="small" @click="showModal") 编辑信息
    <el-dialog title="编辑信息" :visible="isModalVisible" @close="closeModal">
      <el-form ref="merchantInfoForm" :model="merchantInfo">
        <el-form-item label="店名" prop="tradeName" required>
          <el-input v-model="merchantInfo.tradeName"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address" required>
          <el-input v-model="merchantInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="是否上线" prop="isOnline">
          <el-switch v-model="merchantInfo.isOnline"></el-switch>
        </el-form-item>
        <el-form-item label="商家图片">
          el-upload(
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
            name="uploadFile"
            :file-list="fileList")
            el-button(size="small" type="primary") 点击上传
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">关闭</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </el-dialog>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      isModalVisible: false,
      merchantInfo: {
        address: '',
        tradeName: '',
        isOnline: false,
      },
      fileList: [],
    }
  },
  computed: {
    ...mapState('merchant', ['merchant_id', 'address', 'tradeName', 'isOnline', 'access_token']),
    uploadUrl() {
      return `/api/merchants/${this.merchant_id}/icon`;
    },
    headers() {
      return {
        Authorization: `Bearer ${this.access_token}`,
      }
    }
  },
  methods: {
    ...mapActions('merchant', ['updateMerchant']),
    ...mapMutations('merchant', ['setIcon']),
    closeModal() {
      this.isModalVisible = false;
      this.$refs.merchantInfoForm.clearValidate();
    },
    showModal() {
      this.merchantInfo = {
        address: this.address,
        tradeName: this.tradeName,
        isOnline: this.isOnline,
      }
      this.isModalVisible = true;
    },
    handleSubmit() {
      this.$refs.merchantInfoForm.validate(async (valid) => { 
        if (valid) {
          await this.updateMerchant({
            id: this.merchant_id,
            patch: { 
              address: this.merchantInfo.address,
              on: this.merchantInfo.isOnline === false ? 1 : 2,
              name: this.merchantInfo.tradeName,
            }
          });
          this.closeModal();
        }
      });
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
      const { data: { icon_url = ''} } = response;
      this.setIcon(icon_url);
    },
    handleBefore(file) {
      // console.log(file);
    }
  }
};
</script>

<style>
  .merchant-info-container {
    display: flex;
    justify-content: center;
  }
  .mg-bottom-10 {
    margin-bottom: 10px;
  }
</style>

