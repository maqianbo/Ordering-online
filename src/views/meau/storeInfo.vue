<template>
  <div style="background:#ededed; height:100%">
    <div style="background:#fff">
      <!-- 轮播图 -->
      <van-row class="align-cell">
        <van-swipe
          class="my-swipe"
          :autoplay="3000"
          indicator-color="white"
          loop
          style="height:3rem"
        >
          <van-swipe-item v-for="(item,index) in swipeList" :key="index">
            <van-image width="100%" height="100%" :src="item.img" />
          </van-swipe-item>
        </van-swipe>
      </van-row>

      <van-cell-group class="mt-1">
        <van-row class="align-cell" style="font-weight:700">商家信息</van-row>
        <van-field
          rows="2"
          autosize
          type="textarea"
          v-model="store.notice"
          :readonly="true"
          border
        />
      </van-cell-group>
    </div>

    <van-cell-group class="mt-1">
      <van-field label="商家名称" input-align="right" v-model="store.name" disabled />
      <van-field label="商家品类" input-align="right" v-model="store.type" disabled />
      <van-field label="商家地址" input-align="right" v-model="store.address" disabled />
      <van-row
        type="flex"
        justify="space-between"
        style="padding:10px 0;margin:0 16px;border-bottom:1px solid #ebedf0"
      >
        <div>商家电话</div>
        <van-row type="flex" align="center" @click="goLxsj">
          <span style="display:line-block;width:0.5rem;height:0.5rem">
            <van-image width="0.5rem" height="0.5rem" :src="require('./images/lxsj.png')"></van-image>
          </span>
          <span style="color:rgb(53,169,233)" class="ml-1">联系商家</span>
        </van-row>
      </van-row>
      <van-field label="营业时间" input-align="right" v-model="workTime" disabled />
    </van-cell-group>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import { get } from '@/api/axios.js';
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      swipeList: [
        { img: require('./images/sjzp.png') },
        { img: require('./images/sjzp.png') },
        { img: require('./images/sjzp.png') }
      ],
      store: {}, //商家信息
      storeId: '', //商家Id
      workTime: '8:00 - 22:00'
    };
  },
  created() {
    console.log(this.$route.query.storeId);
    this.storeId = this.$route.query.storeId;
    this.getStoreInfo();
  },
  methods: {
    goLxsj() {
      if (this.store.lxdh) {
        let plus = window.$plus;
        plus.device.dial(this.store.lxdh, true);
      } else {
        this.$toast('该商家暂时没有留下手机号');
      }
    },
    // 通过商家id获取商家信息
    async getStoreInfo() {
      let params = {
        id: this.storeId
      };
      let res = await get('/store/findById', params);
      if (res.status == 200) {
        this.store = res.data[0];
      }
    }
  }
};
</script>