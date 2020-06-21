<template>
  <div class="page" style="background:#ededed">
    <van-nav-bar title="添加订单" left-arrow class="active" @click-left="onClickLeft" />
    <!-- 地址展示 -->
    <div style="background:#fff;border-radius:0.2rem" class="mx-1 px-2 mt-2 py-2">
      <van-row type="flex" align="center">
        <span style="font-size:0.35rem;font-weight:700">{{this.address.name}}</span>
        <span class="ml-2">{{this.address.tel}}</span>
      </van-row>
      <van-row class="mt-3">{{this.address.address}}</van-row>
    </div>
    <!-- 商品信息展示 -->
    <div class="page-main mt-2 px-2" style="background:#ededed">
      <van-card
        v-for="(item,index) in goods"
        :key="index"
        :num="item.num"
        :price="item.price"
        :desc="item.desc"
        :title="item.title"
        :thumb="item.img"
      >
        <template #tags>
          <van-tag
            plain
            type="danger"
            v-for="(item,index) in item.tagsList"
            :key="index"
            class="mr-1"
          >{{item}}</van-tag>
        </template>
      </van-card>
    </div>
    <div class="align-cell">
      <van-button type="info" size="large" @click="goShopping">确认购买</van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { get } from '@/api/axios.js';
import moment from 'moment';
export default {
  computed: {
    ...mapGetters(['goods', 'price', 'address'])
  },
  data() {
    return {
      store_name: ''
    };
  },
  created() {
    this.getSj();
  },
  methods: {
    ...mapMutations({
      setActive: 'SET_ACTIVE'
    }),
    onClickLeft() {
      this.$router.goBack();
    },
    // 添加订单
    goShopping() {
      this.setActive('order');
      this.addOrder();
      setTimeout(() => {
        this.$router.push({
          name: 'home'
        });
      }, 1000);
    },
    // 获取商家信息
    async getSj() {
      let params = {
        id: this.goods[0].store_id
      };
      let res = await get('/store/findById', params);
      this.store_name = res.data[0].name;
    },
    // 生成订单
    async addOrder() {
      let user_id = JSON.parse(localStorage.getItem('userInfo')).id;
      let time = moment().format('YYYY-MM-DD HH:mm');
      let params = {
        user_id: user_id,
        store_id: this.goods[0].store_id,
        address_id: this.address.id,
        status: '0', //未完成
        sj: time,
        price: this.price,
        store_name: this.store_name
      };
      let res = await get('/order/saveOrUpdate', params);
    }
  }
};
</script>
<style lang="less" scoped>
</style>