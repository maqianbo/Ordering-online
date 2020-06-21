<template>
  <div class="page" style="background:#f3f4f6">
    <!--查询条件列表-->
    <van-dropdown-menu style="background:#E6EAF7">
      <van-dropdown-item v-model="wczt" :options="wcztOption" @change="change" />
    </van-dropdown-menu>
    <div class="page-main mt-2 px-2">
      <van-card v-for="(item,index) in orderList" :key="index" class="card-list">
        <template #tags>
          <van-row style="font-size:0.3rem;font-weight:700">{{item.store_name}}</van-row>
          <van-row class="mt-1">
            <span>订单编号</span>
            <span
              class="ml-2"
              style="color:red"
            >{{item.id}}{{item.user_id}}{{item.store_id}}{{new Date(item.sj).getTime()}}</span>
          </van-row>
          <van-row class="mt-1">
            <span>订单时间</span>
            <span class="ml-2" style="color:#666">{{item.sj}}</span>
          </van-row>
          <van-row class="mt-1" type="flex" justify="space-between">
            <span>订单价格</span>
            <span style="color:red">￥{{item.price}}</span>
          </van-row>
        </template>
        <template #footer>
          <van-row class="pt-1 mt-1" style="border-top:1px solid #ededed">
            <!-- <van-button size="mini">
              <span style="padding:0 10px">订单详情</span>
            </van-button>-->
            <van-button
              size="mini"
              v-if="item.status == '0'"
              class="ml-4"
              @click="changeZt(item)"
            >去付款</van-button>
            <van-button size="mini" v-if="item.status == '1'" class="ml-4" @click="wcps(item)">
              <span style="padding:0 10px">确认收货</span>
            </van-button>
            <van-button
              size="mini"
              class="ml-4"
              v-if="item.status == '2'"
              @click="goAppraise(item)"
            >评价</van-button>
            <van-button
              size="mini"
              class="ml-4"
              v-if="item.status == '3'"
              @click="deleteDd(item.id)"
            >删除订单</van-button>
          </van-row>
          <div
            class="complete-status"
            :class="item.status == '0' ? 'status-0' : 'status-1'"
          >{{statusArr[item.status]}}</div>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem } from 'vant';
import { get } from '@/api/axios';
export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem
  },
  data() {
    return {
      wczt: '', //完成状态
      wcztOption: [
        { text: '全部订单', value: '' },
        { text: '未付款', value: '0' },
        { text: '配送中', value: '1' },
        { text: '待评价', value: '2' },
        { text: '已完成', value: '3' }
      ],
      orderList: [], //商品列表
      orderList1: [], //备份订单状态
      id: '', //用户id
      statusArr: ['未付款', '配送中', '待评价', '已完成']
    };
  },
  created() {
    this.id = JSON.parse(localStorage.getItem('userInfo')).id;
    this.getOrderList();
  },
  methods: {
    // 订单分类
    change(val) {
      console.log(val);
      if (val == '') {
        this.orderList = this.orderList1;
      } else {
        this.orderList = this.orderList1.filter(item => {
          return item.status == val;
        });
      }
    },
    // 去评价
    goAppraise(item) {
      this.$router.push({
        name: 'appraiseOrder',
        params: { ordderInfo: item }
      });
    },
    // 获取用户订单
    async getOrderList() {
      let params = {
        id: this.id
      };
      let res = await get('order/findByUserId', params);
      this.orderList1 = res.data.reverse();
      this.orderList = res.data.reverse();
    },
    // 去付款
    async changeZt(item) {
      let params = {
        id: item.id,
        user_id: item.user_id,
        store_id: item.store_id,
        address_id: item.address_id,
        status: '1', //未完成
        sj: item.sj,
        price: item.price,
        store_name: item.store_name
      };
      let res = await get('/order/saveOrUpdate', params);
      this.getOrderList();
    },
    // 完成配送
    async wcps(item) {
      let params = {
        id: item.id,
        user_id: item.user_id,
        store_id: item.store_id,
        address_id: item.address_id,
        status: '2', //
        sj: item.sj,
        price: item.price,
        store_name: item.store_name
      };
      let res = await get('/order/saveOrUpdate', params);
      this.getOrderList();
    },
    // 删除订单
    async deleteDd(id) {
      let params = {
        id: id
      };
      let res = await get('/order/deleteById', params);
      this.getOrderList();
    }
  }
};
</script>
<style lang="less" scoped>
.card-list {
  position: relative;
  overflow: hidden;
  background: #fff;
}
.complete-status {
  position: absolute;
  right: 0;
  top: 0rem;
  width: 1.32rem;
  height: 0.38rem;
  line-height: 0.38rem;
  font-size: 0.2rem;
  color: #fff;
  text-align: center;
  transform-origin: 50% 50%;
  transform: translateX(0.32rem) translateY(0.16rem) rotate(45deg);
  &.status-0 {
    background: #ff4425;
  }
  &.status-1 {
    background: #00c454;
  }
}
</style>