<template>
  <div class="page">
    <van-nav-bar title="简介" left-arrow class="active" @click-left="onClickLeft" />
    <div class="page-main">
      <van-row>
        <!-- <p class="titleStytle">{{xqForm.dtmc}}</p> -->
      </van-row>
      <van-row class="align-cell" type="flex" align="center" style="margin-bottom:0.2rem">
        <van-col :span="4">
          <svg class="icon-iconfont" aria-hidden="true" style="font-size:.8rem">
            <use xlink:href="#icon-touxiang" />
          </svg>
        </van-col>
        <van-col :span="20">
          <div class="date-bm">
            <div style="font-weight:700;height:0.4rem">{{xqForm.ssbm}}</div>
            <div style="font-size:0.25rem;color:rgb(168,167,172)">{{xqForm.fbsj}}</div>
          </div>
        </van-col>
      </van-row>
      <van-row>
        <div class="align-cell" style="text-indent:2em" v-html="xqForm.dtnr"></div>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xqForm: {
        dtmc: '产品介绍',
        ssbm: '外卖app',
        fbsj: '2020-03-29',
        dtnr:
          '本产品由太原工业学院电子工程系马先森个人独立完成，最终解释所有权也归马先森所有。虽然本产品本阶段样式简陋，功能单一，但是框架完整，易于维护，产品bug率低，还是一款不错的订餐系统。最后隆重声明，本产品暂时无法上线使用，造成严重后果，马先森表示不承担任何法律和民事责任，谢谢！'
      }
    };
  },
  created() {},
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
</style>