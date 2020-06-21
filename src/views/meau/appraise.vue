<template>
  <div class="page appraise-content">
    <van-card
      v-for="(item,index) in appraiseList"
      :key="index"
      style="background:#fff;border-bottom:1px solid #ededed"
    >
      <template #tags>
        <van-row type="flex" align="center">
          <van-col :span="4">
            <van-image width="1rem" height="1rem" :src="item.userImg"></van-image>
          </van-col>
          <van-col :span="20">
            <van-row type="flex" justify="space-between" align="center">
              <van-col style="font-size:0.4rem;font-weight:600">{{item.username}}</van-col>
              <van-col style="color:#ededed;font-size:0.1rem">{{item.plsj}}</van-col>
            </van-row>
            <div>
              <span style="color:rgb(254,164,46);font-size:0.1rem" v-if="item.pltd == '01'">非常满意</span>
              <span style="color:rgb(220, 220, 40);font-size:0.1rem" v-if="item.pltd == '02'">满意</span>
              <span style="color:rgb(254,3,2);font-size:0.1rem" v-if="item.pltd == '03'">差评</span>
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col :span="4"></van-col>
          <van-col :span="20" style="text-indent:2em">{{item.plnr}}</van-col>
        </van-row>
        <van-row class="sjhf" v-if="item.sjhfnr">
          <div class="jt-icon"></div>
          <div
            style="background:#ededed;text-indent:2em;border-radius:0.1rem;padding:0.15rem"
          >{{item.sjhfnr}}</div>
        </van-row>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appraiseList: [
        {
          userImg: require('./images/meishi.png'),
          username: '我超帅',
          plsj: '2020-03-15',
          pltd: '01',
          plnr:
            '这次购买非常满意，肉很多，味道很好，这个价格相当便宜 这次购买非常满意，肉很多，味道很好，这个价格相当便宜 这次购买非常满意。',
          sjhfnr:
            '谢谢您的好评，您的满意是我们最大的荣幸  谢谢您的好评，您的满意是我们最大的荣幸！！！'
        },
        {
          userImg: require('./images/meishi.png'),
          username: '我超帅',
          plsj: '2020-03-15',
          pltd: '01',
          plnr:
            '这次购买非常满意，肉很多，味道很好，这个价格相当便宜 这次购买非常满意，肉很多，味道很好，这个价格相当便宜 这次购买非常满意。',
          sjhfnr:
            '谢谢您的好评，您的满意是我们最大的荣幸 谢谢您的好评，您的满意是我们最大的荣幸！！！'
        },
        {
          userImg: require('./images/meishi.png'),
          username: '我超帅',
          plsj: '2020-03-15',
          pltd: '01',
          plnr:
            '这次购买非常满意，肉很多，味道很好，这个价格相当便宜 这次购买非常满意，肉很多，味道很好，这个价格相当便宜 这次购买非常满意。',
          sjhfnr:
            '谢谢您的好评，您的满意是我们最大的荣幸  谢谢您的好评，您的满意是我们最大的荣幸！！！'
        }
      ] //评价lie表
    };
  },
  created() {
    console.log(this.$route.query.storeId);
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.appraise-content {
  height: 100%;
  background: #fff;
  overflow: auto;
}
.sjhf {
  padding-top: 0.2rem;
  position: relative;
  .jt-icon {
    position: absolute;
    top: -0.2rem;
    left: 17%;
    width: 0;
    height: 0;
    border: 0.2rem solid;
    border-color: transparent transparent #ededed transparent;
  }
}
</style>