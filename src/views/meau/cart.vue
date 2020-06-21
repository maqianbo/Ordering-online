<template>
  <div class="page">
    <van-nav-bar left-arrow :title="storeInfo.name" class="active" @click-left="onClickLeft" />
    <van-row type="flex" justify="space-between">
      <van-col :span="8" align="center" v-for="(item,index) in routerArr" :key="index">
        <router-link :to="{path:item.route,query:{storeId:storeInfo.id}}" class="tab-item" replace>
          <div class="slider-button">{{item.txt}}</div>
        </router-link>
      </van-col>
    </van-row>
    <div class="page-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerArr: [
        { route: '/cart/shopMeau', txt: '点餐' },
        { route: '/cart/appraise', txt: '评价' },
        { route: '/cart/storeInfo', txt: '商家' }
      ],
      storeInfo: {} //商家信息对象
    };
  },
  created() {
    this.storeInfo = this.$route.query.info;
  },
  methods: {
    onClickLeft() {
      this.$router.goBack();
    }
  }
};
</script>
<style lang="less">
.tab-item {
  .slider-button {
    line-height: 1rem;
    background: #ededed;
    color: #333;
  }
  &.active {
    .slider-button {
      background: #fff;

      color: rgba(230, 0, 0);
      border-bottom: 1px solid #ededed;
    }
  }
}
</style>