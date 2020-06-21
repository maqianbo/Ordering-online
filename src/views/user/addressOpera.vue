<template>
  <div class="page">
    <van-nav-bar title="地址编辑" left-arrow class="active" @click-left="onClickLeft" />
    <van-cell-group class="page-main">
      <van-field v-model="addressInfo.addr" label="收货地址" placeholder="请输入收货地址" />
      <van-field v-model="addressInfo.addre" label="门牌号" placeholder="请输入门牌号" />
      <van-field v-model="addressInfo.name" label="收货人姓名" placeholder="请输入收货人姓名" />
      <van-field v-model="addressInfo.tel" type="tel" label="联系方式" placeholder="请输入手机号" />
    </van-cell-group>
    <van-cell>
      <van-button type="info" size="large" round @click="goAddAddress">保存</van-button>
    </van-cell>
    <van-cell>
      <van-button type="primary" size="large" round plain @click="goDelete">删除</van-button>
    </van-cell>
  </div>
</template>

<script>
import { AddressEdit } from 'vant';
import { getPosition } from '@/utils/common.js';
import { get } from '@/api/axios';
export default {
  components: {
    [AddressEdit.name]: AddressEdit
  },
  data() {
    return {
      route: {},
      addressInfo: {}
    };
  },
  created() {
    this.route = this.$route.query.addressInfo;
    if (this.route) {
      this.addressInfo = this.route;
    }
  },
  methods: {
    onClickLeft() {
      this.$router.goBack();
    },
    //获取地理位置和坐标
    // getaddress() {
    //   getPosition(ptDate => {
    //     this.addressInfo.addr = ptDate.address;
    //     // this.xjdzb = ptDate.lng + ' ' + ptDate.lat;
    //   });
    // },

    // 保存地址
    async goAddAddress() {
      let uesrInfo = JSON.parse(localStorage.getItem('userInfo'));
      let user_id = uesrInfo.id;
      let params = {
        id: this.addressInfo.id ? this.addressInfo.id : '',
        name: this.addressInfo.name,
        tel: this.addressInfo.tel,
        addre: this.addressInfo.addre,
        addr: this.addressInfo.addr,
        address: this.addressInfo.addr + '' + this.addressInfo.addre,
        isDefault: false,
        user_id: user_id
      };
      let res = await get('/address/saveOrUpdate', params);
      if (res.status == 200) {
        this.$toast({
          type: 'success',
          message: '保存成功'
        });
        this.$router.goBack();
      }
    },
    // 删除地址
    goDelete() {
      if (!this.addressInfo.id) {
        this.$toast('您还未添加过此地址消息');
        return;
      }
      this.deleteAddressByid();
    },
    // 向后台请求删除地址
    async deleteAddressByid() {
      let params = {
        id: this.addressInfo.id
      };
      let res = await get('/address/deleteById', params);
      if (res.status == 200) {
        this.$toast({
          type: 'success',
          message: '删除成功'
        });
        this.$router.goBack();
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>