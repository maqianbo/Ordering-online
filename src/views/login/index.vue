<template>
  <div>
    <div style="padding:1rem 0">
      <van-row type="flex" justify="center">
        <van-col :span="12" align="center">
          <van-image width="150" height="150" :src="require('../../assets/images/login/timg.jpg')" />
        </van-col>
      </van-row>
    </div>
    <!-- 用户名表单验证 -->
    <van-form>
      <van-field v-model="username" label="用户名" placeholder="请输入用户名" />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
      <van-row type="flex" justify="space-between" class="align-cell">
        <van-col
          :span="8"
          align="left"
          style="font-size:0.1rem;color:blue"
          @click="goRegister"
        >注册账号？</van-col>
        <van-col :span="8" align="center" style="font-size:0.1rem;color:green" @click="goMeau">访客登录</van-col>
        <van-col
          :span="8"
          align="right"
          style="font-size:0.1rem;color:red"
          @click="goFindPassword"
        >找回密码</van-col>
      </van-row>
      <div style="margin: 0.3rem;">
        <van-button round block type="info" @click="submitXx">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { fail } from 'assert';
import { get } from '@/api/axios.js';
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  created() {
    if (this.$route.query) {
      this.username = this.$route.query.username;
      this.password = this.$route.query.password;
    }
  },
  methods: {
    // 提交信息
    submitXx() {
      if (!this.username) {
        this.$toast({
          type: 'fail',
          message: '请填写用户名'
        });
      } else {
        if (!this.password) {
          this.$toast({
            type: 'fail',
            message: '请填写密码'
          });
        }
      }
      this.getAllCustomer();
    },
    // 找回密码
    goFindPassword() {
      this.$router.push({
        path: '/findPass'
      });
    },
    // 注册账号
    goRegister() {
      this.$router.push({
        path: '/register'
      });
    },
    // 去浏览页面
    goMeau() {
      this.$router.push({
        path: '/meau'
      });
    },
    // 查询所有顾客
    async getAllCustomer() {
      let res = await get('/customer/findAll');
      // 查询表中是否有该账号密码
      res = res.data;
      let itemArr = res.filter(item => {
        return item.username == this.username;
      });
      if ((itemArr.length = 1)) {
        let pass = itemArr[0].password;
        if (pass == this.password) {
          console.log('登陆成功');
          localStorage.setItem(
            'userInfo',
            JSON.stringify({
              name: this.username,
              password: this.password,
              id: itemArr[0].id
            })
          );
          this.$router.push({
            path: '/home'
          });
        } else {
          console.log('登陆失败');
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
