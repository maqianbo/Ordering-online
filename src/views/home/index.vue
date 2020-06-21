<template>
  <div class="page">
    <!-- <div class="page-main"></div> -->
    <van-tabbar v-model="active1" fixed @change="itemChange">
      <van-tabbar-item name="meau" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="order" icon="cart-o" info="5">订单</van-tabbar-item>
      <van-tabbar-item name="user" icon="setting-o">个人</van-tabbar-item>
    </van-tabbar>
    <meau-page v-if="active1 == 'meau'"></meau-page>
    <order-page v-if="active1 == 'order'"></order-page>
    <user-page v-if="active1 == 'user'"></user-page>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
import meauPage from '../meau/index.vue';
import userPage from '../user/index.vue';
import orderPage from '../order/index.vue';
import { mapMutations, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['active'])
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    meauPage,
    userPage,
    orderPage
  },
  data() {
    return {
      active1: ''
    };
  },
  created() {
    this.active1 = this.active;
  },
  methods: {
    ...mapMutations({
      setActive: 'SET_ACTIVE'
    }),
    itemChange(val) {
      this.setActive(val);
      this.active1 = val;
    }
  }
};
</script>
