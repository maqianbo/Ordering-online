<template>
  <div class="page" style="background:#ededed">
    <van-nav-bar title="地址管理" left-arrow class="active" @click-left="onClickLeft" />
    <van-address-list
      v-model="choseAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="queryAddress"
    />
  </div>
</template>

<script>
import { AddressList } from 'vant';
import { mapMutations, mapGetters } from 'vuex';
import { get } from '@/api/axios';
export default {
  computed: {
    ...mapGetters(['price', 'address'])
  },
  components: {
    [AddressList.name]: AddressList
  },
  data() {
    return {
      choseAddressId: '',
      list: []
    };
  },
  created() {
    this.getlist();
    this.choseAddressId = this.address.id;
  },
  methods: {
    ...mapMutations({
      setAddress: 'SET_ADDRESS'
    }),
    onClickLeft() {
      this.$router.goBack();
    },
    onAdd() {
      this.$router.push({
        path: '/addressOpera'
      });
    },
    onEdit(item, index) {
      this.$router.push({
        path: '/addressOpera',
        query: {
          addressInfo: item
        }
      });
    },
    // 切换默认地址
    queryAddress(val) {
      this.setAddress(val);
      if (this.price) {
        this.$router.push({
          name: 'addOrder'
        });
      } else {
        this.$toast('默认地址修改成功');
      }
    },
    // 获取地址列表
    async getlist() {
      let uesrInfo = JSON.parse(localStorage.getItem('userInfo'));
      let user_id = uesrInfo.id;
      let params = {
        user_id: user_id
      };
      let res = await get('/address/findById', params);
      if (res.status == 200) {
        this.list = res.data;
      }
    }
  }
};
</script>
<style lang="less">
.van-address-list__bottom {
  background: #ededed;
}
</style>
