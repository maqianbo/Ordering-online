<template>
  <div class="page appraiseOrder">
    <van-nav-bar title="评价订单" left-arrow class="active" @click-left="onClickLeft" />
    <div class="page-main align-cell">
      <van-field
        rows="5"
        autosize
        type="textarea"
        v-model="reportInformation"
        placeholder="请输入评价内容"
        style="background:#ededed;border-radius:0.2rem"
      />
    </div>
    <div class="align-cell">
      <van-button type="info" size="large" @click="submit">提交评价</van-button>
    </div>
  </div>
</template>

<script>
import { get } from '@/api/axios';
export default {
  data() {
    return {
      reportInformation: ''
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.goBack();
    },
    submit() {
      // console.log(this.reportInformation);
      this.changeZt();
      this.$toast('评价成功');
      setTimeout(() => {
        this.onClickLeft();
      }, 1000);
    },
    // 已完成
    async changeZt() {
      let item = this.$route.params.ordderInfo;
      let params = {
        id: item.id,
        user_id: item.user_id,
        store_id: item.store_id,
        address_id: item.address_id,
        status: '3', //未完成
        sj: item.sj,
        price: item.price,
        store_name: item.store_name
      };
      let res = await get('/order/saveOrUpdate', params);
    }
  }
};
</script>
<style lang="less">
.appraiseOrder textarea {
  text-indent: 0.4rem;
}
</style>