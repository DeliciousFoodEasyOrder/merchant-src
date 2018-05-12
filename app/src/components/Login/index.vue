<template lang="pug">
  div.positioner
    div.container
      div(class="logo")
      div(class="app-name")
        span 好吃易点
      el-form(:model="form" :rules="rules" ref="form")
        el-form-item(prop="id")
          el-input(v-model="form.id" type="text" placeholder="请输入用户账户")
        el-form-item(prop="password")
          el-input(v-model="form.password" type="password" placeholder="请输入用户密码")
        el-form-item
          el-button.button(type="primary" @click="submit") 登录
      div(class="hint")
        span 没有账户？
        router-link(:to="{name: 'Regist'}") 注册    
</template>
<script>
import http from '../../utils/network/http.js';
import{ mapActions, mapMutations } from 'vuex';
import { notify } from '../../utils/messages/notify'; 

export default{
  data() {
    return {
      form: {
        id: null
      },
      rules: {
        id: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }    
    };
  },
  methods: {
    ...mapActions('merchant', ['login']),
    ...mapMutations('merchant', ['setToken', 'setMerchant']),
    submit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            const { data } = await this.login(this.form);
            this.setToken(data.access_token);
            notify({
              type: 'success',
              title: '登录成功',
              duration: 2000
            });
            this.$router.push({name: 'Home'});
          } catch(e) {
            console.error(e);
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.positioner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.container {
  width: 300px;
  margin-bottom: 100px;
}

.logo {
  margin: 0 auto;
  width: 150px;
  height: 150px;
  background: url("../../assets/logo.jpeg");
  background-size: contain;
  border-radius: 50%;
  margin-bottom: 20px;
}

.app-name {
  font-weight: 400;
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
}

.button {
  width: 100%;
}
</style>
