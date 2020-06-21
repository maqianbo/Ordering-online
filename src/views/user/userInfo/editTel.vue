<template>
  <div class="page">
    <van-nav-bar title="修改手机号" left-arrow class="active" @click-left="onClickLeft" />
    <div class="page-main">
      <van-row
        class="align-cell mt-5"
        type="flex"
        justify="center"
        style="font-weight:700"
      >请输入要绑定的新手机号</van-row>
      <van-field v-model="tel" placeholder="请输入要绑定的新手机号" type="tel" clearable />
    </div>
    <van-row class="align-cell">
      <van-button type="info" size="large" @click="goChangeTel">更改</van-button>
    </van-row>
  </div>
</template>

<script>
import { get } from '@/api/axios.js';
export default {
  data() {
    return {
      tel: '',
      ccinfo: {}
    };
  },
  created() {
    if (this.$route.query) {
      this.ccinfo = this.$route.query;
      console.log(this.ccinfo);
    }
  },
  methods: {
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 更改手机号
    goChangeTel() {
      this.$dialog({
        title: '更换手机号',
        message: '确认要更换绑定手机号吗'
      }).then(() => {
        this.changeTel();
      });
    },
    // 修改手机号
    async changeTel() {
      this.ccinfo.telephone = this.tel;
      let params = this.ccinfo;
      let res = await get('/customer/saveOrUpdateCus', params);
      if (res.status == 200) {
        this.$toast('修改成功');
        this.$router.go(-1);
      }
    }
  }
};
</script>