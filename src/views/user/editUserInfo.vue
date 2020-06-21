<template>
  <div class="page">
    <van-nav-bar title="账户安全" left-arrow class="active" @click-left="onClickLeft" />
    <div class="page-main" style="background:#ededed">
      <van-cell-group>
        <van-field label="用户名" v-model="form.username" readonly input-align="right" />
        <van-field label="性别" v-model="form.gender" readonly input-align="right" />
      </van-cell-group>
      <van-cell-group class="mt-2">
        <van-cell title="修改绑定手机号" is-link :value="form.telephone" @click="goEditTel" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { get } from '@/api/axios.js';
import { getHideTel } from '@/utils/common.js';
export default {
  data() {
    return {
      form: {
        username: '',
        gender: '',
        telephone: ''
      }, //展示信息
      ccInfo: {} //存储信息
    };
  },
  created() {
    this.getUserXX();
  },
  methods: {
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 去修改手机号
    goEditTel() {
      this.$router.push({
        path: './editTel',
        query: this.ccInfo
      });
    },
    // 获取用户信息
    async getUserXX() {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log('user', userInfo);
      let res = await get('/customer/findAll');
      // 查询表中是否有该账号密码
      res = res.data;
      let itemArr = res.filter(item => {
        return (
          item.username == userInfo.name && item.password == userInfo.password
        );
      });
      let info = itemArr[0];
      this.form.username = info.username;
      this.form.gender = info.gender;
      this.form.telephone = getHideTel(info.telephone);
      this.ccInfo = info;
    }
  }
};
</script>
<style lang="less" scoped>
</style>