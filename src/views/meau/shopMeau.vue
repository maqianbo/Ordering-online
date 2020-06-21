<template>
  <div style="height:100%">
    <van-row class="meau-content">
      <div class="meau-list">
        <van-sidebar class="bar-list" v-model="activeKey" @change="onChange">
          <van-sidebar-item :title="item.name" v-for="(item,index) in shopList" :key="index" />
        </van-sidebar>
        <div class="card-list ml-1">
          <van-card
            v-for="(item,index) in cardList"
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
            <template #footer>
              <van-button size="mini" v-if="item.num > 0" @click="cancleOrder(item.id)">-</van-button>
              <van-button size="mini" @click="goOrder(item.id)">+</van-button>
            </template>
          </van-card>
        </div>
      </div>

      <van-row
        class="align-cell"
        type="flex"
        justify="space-between"
        align="center"
        style="background:#333;color:#fff"
      >
        <span>价格：{{shopPrice}}</span>
        <van-button type="primary" size="mini" @click="goSelectAddress">结算</van-button>
      </van-row>
    </van-row>
  </div>
</template>

<script>
import { Sidebar, SidebarItem } from 'vant';
import { mapMutations, mapGetters } from 'vuex';
import { get } from '@/api/axios.js';
export default {
  computed: {
    ...mapGetters(['address', 'id'])
  },
  components: {
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem
  },

  data() {
    return {
      flList: [],
      shopAll: [],
      activeKey: 0, //选中的侧边栏索引
      shopList: [], //选项列表
      cardList: [
        {
          id: '2',
          num: 0,
          price: '44.7',
          desc: '描述信息写一点',
          title: '商品名称',
          img: require('./images/meishi.png'),
          tagsList: ['好吃', '满50减10']
        },
        {
          id: '3',
          num: 0,
          price: '49.99',
          desc: '描述信息写一点',
          title: '商品名称',
          img: require('./images/meishi.png'),
          tagsList: ['好吃', '满50减10']
        },
        {
          id: '4',
          num: 0,
          price: '100',
          desc: '描述信息写一点',
          title: '商品名称',
          img: require('./images/meishi.png'),
          tagsList: ['好吃', '满50减10']
        },
        {
          id: '5',
          num: 0,
          price: '100',
          desc: '描述信息写一点',
          title: '商品名称',
          img: require('./images/meishi.png'),
          tagsList: ['好吃', '满50减10']
        },
        {
          id: '6',
          num: 0,
          price: '100',
          desc: '描述信息写一点',
          title: '商品名称',
          img: require('./images/meishi.png'),
          tagsList: ['好吃', '满50减10']
        }
      ], //商品列表
      onShopping: [], //要购买的商品
      shopPrice: '' //商品价格
    };
  },
  created() {
    this.getfl();
  },
  mounted() {
    this.getCardList();
  },
  methods: {
    ...mapMutations({
      setGoods: 'SET_GOODS',
      setPrice: 'SET_PRICE'
    }),
    onChange(index) {
      let id = this.shopList[index].id;
      let cardList = this.shopAll.filter(item => {
        return item.category_id == id;
      });
      this.cardList = cardList.map(item => {
        let obj = {
          id: item.id,
          num: item.num,
          price: item.price,
          desc: item.desc,
          title: item.title,
          img: require('./images/meishi.png'),
          tagsList: item.tagList.split(','),
          store_id: item.store_id
        };
        return obj;
      });
    },
    // 下单
    goOrder(id) {
      let shopCard = this.cardList.filter(item => item.id == id)[0];
      shopCard.num = shopCard.num + 1;
      let shopCardJs = JSON.parse(JSON.stringify(shopCard));
      let ifContain = this.onShopping.some(item => item.id == shopCardJs.id);
      if (ifContain) {
        this.onShopping = this.onShopping.map(item => {
          if (item.id == id) {
            item.num = item.num + 1;
          }
          return item;
        });
      } else {
        this.onShopping.push(shopCardJs);
      }
      this.getPrice();
    },
    // 取消下单
    cancleOrder(id) {
      let shopCard = this.cardList.filter(item => item.id == id)[0];
      if (shopCard.num > 0) {
        shopCard.num = shopCard.num - 1;
        let shopCardJs = JSON.parse(JSON.stringify(shopCard));
        this.onShopping = this.onShopping.map(item => {
          if (item.id == shopCardJs.id) {
            item.num = shopCardJs.num;
          }
          return item;
        });
        this.onShopping = this.onShopping.filter(item => item.num > 0);
      }
      this.getPrice();
    },
    // 商品价格计算
    getPrice() {
      this.shopPrice = '';
      this.onShopping.forEach(item => {
        let price = (Number(item.num) * Number(item.price)).toFixed(2);
        this.shopPrice = (Number(this.shopPrice) + Number(price)).toFixed(2);
      });
    },
    // 去添加地址
    goSelectAddress() {
      this.setGoods(this.onShopping);
      this.setPrice(this.shopPrice);
      let ifAddress = Object.keys(this.address);
      if (ifAddress.length == 0) {
        this.$router.push({
          name: 'addressList'
        });
      } else {
        this.$router.push({
          name: 'addOrder'
        });
      }
    },
    // 获取上品分类
    async getfl() {
      let res = await get('/category/findAll');
      if (res.status == 200) {
        this.flList = res.data;
      }
    },
    // 获取商家商品
    async getCardList() {
      let params = {
        id: this.id
      };
      let res = await get('/shop/findByStoreId', params);
      if (res.status == 200) {
        this.shopAll = res.data;
        let flArr = res.data.map(item => {
          return item.category_id;
        });
        flArr = Array.from(new Set(flArr));
        this.shopList = this.flList.filter(item => flArr.indexOf(item.id) >= 0);
        // 取第一个列表
        let id = this.shopList[0].id;
        let cardList = this.shopAll.filter(item => {
          return item.category_id == id;
        });
        this.cardList = cardList.map(item => {
          let tagsList = item.tagList.split(',');
          let obj = {
            id: item.id,
            num: item.num,
            price: item.price,
            desc: item.desc,
            title: item.title,
            img: require('./images/meishi.png'),
            tagsList: tagsList,
            store_id: item.store_id
          };
          return obj;
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.meau-content {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  .meau-list {
    flex: 1;
    display: flex;
    overflow: hidden;
    background: #f2f4fa;
    .bar-list {
      width: 2rem;
      height: 100%;
      overflow: auto;
    }
    .card-list {
      height: 100%;
      flex: 1;
      overflow: auto;
    }
  }
}
</style>