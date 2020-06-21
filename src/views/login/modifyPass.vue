<template>
  <div class="page">
    <van-nav-bar title="修改密码" left-arrow class="active" @click-left="onClickLeft" />
    <van-cell-group class="page-main">
      <van-field label="用户名" v-model="form.username" readonly />
      <van-field label="密码" v-model="form.password" placeholder="请输入密码" type="password" />
      <van-field label="确认密码" v-model="form.passwordQr" placeholder="请再次输入密码" type="password" />
    </van-cell-group>
    <van-row class="align-cell">
      <van-button type="info" size="large" @click="goModifyPass">确认修改</van-button>
    </van-row>
  </div>
</template>

<script>
import { get } from '@/api/axios.js';
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        passwordQr: ''
      },
      infoObj: {} //个人信息obj
    };
  },
  created() {
    this.form.username = this.$route.query.username;
    this.infoObj = this.$route.query.infoObj;
  },
  methods: {
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 修改密码
    goModifyPass() {
      if (!this.form.password) {
        this.$toast({
          message: '请填写密码'
        });
        return;
      }
      if (this.form.passwordQr != this.form.password) {
        this.$toast({
          message: '前后密码不一致'
        });
        return;
      }
      /*****************修改密码接口**********************************/
      this.changePass();
    },
    // 修改密码
    async changePass() {
      this.infoObj.password = this.form.password;
      let params = this.infoObj;
      let res = await get('/customer/saveOrUpdateCus', params);
      if (res.status == 200) {
        this.$router.push({
          path: '/login',
          query: {
            username: this.form.username,
            password: this.form.password
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>