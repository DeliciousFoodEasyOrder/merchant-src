<template lang="pug">
  div.positioner
    div.container
      div(class="logo")
      div(class="app-name")
        span 好吃易点
      el-form(:model="form", :rules="rules", ref="form")
        el-form-item(prop="phone")
          el-input(v-model="form.phone" type="text" placeholder="手机号码")
        el-form-item(prop="email")
          el-input(v-model="form.email" type="text" placeholder="邮箱")
        el-form-item(prop="password")
          el-input(v-model="form.password" type="password" placeholder="密码")
        el-form-item(prop="reEnterPassword")
          el-input(v-model="form.reEnterPassword" type="password" placeholder="确认密码")
        el-form-item
          el-button.button(type="primary" @click="submit") 注册
      div(class="hint")
        span 已有账户？
        router-link(:to="{name: 'Login'}") 登录
</template>
<script>
import http from '../../utils/network/http';
import { notify } from '../../utils/messages/notify';
export default{
  data() {
    return {
      form: {
        id: '',
        phone: '',
        password: '',
        reEnterPassword: ''
      },
      rules: {
        phone: [{validator: this.validatePhone, trigger: 'blur'}],
        email: [{validator: this.validateEmail, trigger: 'blur'}],
        password: [{validator: this.validatePass, trigger: 'blur'}],
        reEnterPassword: [{validator: this.validatePass2, trigger: 'blur'}]
      }
    };
  },
  methods: {
    submit() {
      this.$refs['form'].validate(async (valid) => {
        console.log(valid);              
        if (valid) {
          try {
            await http.createMerchant({
              "merchant_id": null,
              "email": this.form.email,
              "phone": this.form.phone,
              "password": this.form.password
            });
            notify({
              type: 'success',
              title: '注册成功，请登录',
              duration: 2000
            })
          } catch(e) {
            console.error(e);
          }
        }
      });
    },
    validatePhone(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        let pattern = /\D+/g;
        if (value.length !== 11 || pattern.test(value)) {
          callback(new Error('手机号格式不正确'));
        } else {
          callback();
        }
      }
    },
    validateEmail(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else {
        let pattern = /^[a-zA-Z0-9\-_]+@(?:[a-zA-Z0-9\-_]+\.)+[a-zA-Z0-9\-_]+$/;
        if (!pattern.test(value)) {
          callback(new Error('邮箱格式不正确'));
        } else {
          callback();
        }
      }
    },
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        value = value.replace(/\s/g, '');
        if (value.length < 6) {
          callback(new Error('密码长度不能小于6位'));
        } else {
          callback();
        }
      }
    },
    validatePass2(rule, value, callback) {
      if (value !== this.form.password) {
        callback(new Error('密码不一致'));
      } else {
        callback();
      }
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
  margin-bottom: 10px;
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
  height: 40px;
  text-align: center;
}
</style>
