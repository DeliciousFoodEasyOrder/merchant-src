<template>
  <el-dialog :title="title" :visible="outerVisible" @close="closeModal">
    <div class="qrcode-container">
      <img class="qrcode" :src="qrCodeUrlWithPrefix">
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" class="download">
        <a :href="qrCodeUrlWithPrefix" :download="title">下载</a>      
      </el-button>
      <el-button type="default" @click="closeModal">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: ['outerVisible', "seat"],
    computed: {
      qrCodeUrlWithPrefix() {
        return `/api${this.seat.qr_code_url}`;
      },
      title() {
        return `座位${this.seat.number}的二维码`;
      }
    },
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
  .download a {
    text-decoration: none;
    color: white;
  }
</style>
