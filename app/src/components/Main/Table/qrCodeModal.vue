<template>
  <el-dialog title="二维码" :visible="outerVisible" @close="closeModal">
    <div class="qrcode-container">
      <img class="qrcode" src="http://on6ak4en1.bkt.clouddn.com/741526718561_.pic_hd.jpg">
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeModal">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: ['outerVisible'],
    methods: {
      closeModal() {
        this.$emit('closeModal');
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
