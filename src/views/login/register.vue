<template>
  <div class="page">
    <van-nav-bar title="用户注册" left-arrow class="active" @click-left="onClickLeft" />
    <van-cell-group>
      <van-field label="用户名" v-model="form.username" placeholder="请输入用户名" />
      <van-field label="密码" v-model="form.password" placeholder="请输入密码" type="password" />
      <van-field label="确认密码" v-model="form.passwordQr" placeholder="请再次输入密码" type="password" />
    </van-cell-group>

    <van-cell-group class="page-main mt-1-5">
      <van-field label="真实姓名" v-model="form.name" placeholder="请输入真实姓名" />
      <van-field label="手机号" v-model="form.telephone" placeholder="请输入手机号" type="number" />
      <!-- <van-row class="align-cell">
        <van-col :span="6">性别：</van-col>
        <van-col :span="18">
          <van-radio-group v-model="form.gender" direction="horizontal">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </van-col>
      </van-row>
      <van-field label="身份证" v-model="form.idCard" placeholder="请输入身份证号" />-->
    </van-cell-group>

    <van-row class="align-cell">
      <van-button type="info" size="large" @click="goZhuce">提交</van-button>
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
        passwordQr: '',

        name: '', //真实姓名
        telephone: '',
        gender: '废弃',
        idCard: '废弃' //身份证号
      }
    };
  },
  created() {},
  methods: {
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 注册
    goZhuce() {
      if (!this.form.username) {
        this.$toast({
          message: '请填写用户名'
        });
        return;
      }
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
      if (!this.form.name) {
        this.$toast({
          message: '请填写姓名'
        });
        return;
      }
      if (!this.form.telephone) {
        this.$toast({
          message: '请填写手机号'
        });
        return;
      }
      if (!this.form.gender) {
        this.$toast({
          message: '请选择你的性别'
        });
        return;
      }
      if (!this.form.idCard) {
        this.$toast({
          message: '请填写身份证号'
        });
        return;
      }
      /**********************请求接口******************************/
      this.getZh();
    },
    // 注册账户请求
    async getZh() {
      let params = this.form;
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