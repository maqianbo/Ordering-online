<template>
  <div class="page">
    <van-nav-bar title="找回密码" left-arrow class="active" @click-left="onClickLeft" />
    <van-cell-group class="page-main">
      <!-- <van-field label="用户名" v-model="form.username" placeholder="请输入用户名" /> -->
      <van-field label="真实姓名" v-model="form.name" placeholder="请输入真实姓名" />
      <van-field label="手机号" v-model="form.telephone" placeholder="请输入手机号" type="number" />
      <van-field v-model="yzm" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary" @click="getYzm">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <van-row class="align-cell">
      <van-button type="info" size="large" @click="goFindPass">提交</van-button>
    </van-row>
  </div>
</template>

<script>
import { get } from '@/api/axios.js';
export default {
  data() {
    return {
      form: {
        // username: '',
        name: '',
        telephone: ''
      },
      yzm: '' //短信验证码
    };
  },
  created() {},
  methods: {
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取短信验证码
    getYzm() {
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
      /*************请求接口*****************************/
      this.$dialog.alert({
        title: '验证码',
        message: '123456789'
      });
    },
    // 去找回密码
    goFindPass() {
      if (this.yzm == 123456789) {
        this.getinfo();
        return;
      } else {
        this.$toast({
          type: 'fail',
          message: '你的手机号和姓名不匹配'
        });
      }
    },
    // 通过手机号查询信息
    async getinfo() {
      let params = {
        telephone: this.form.telephone
      };
      let res = await get('/customer/findByTel', params);
      let rst = res.data[0];
      console.log(this.form.name, rst.name);
      if (this.form.name == rst.name) {
        this.$router.push({
          path: '/modifyPass',
          query: {
            username: rst.username,
            infoObj: rst
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>