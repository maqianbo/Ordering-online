<template>
  <div class="page">
    <van-cell>
      <van-row type="flex" align="center">
        <van-col :span="16" align="left">
          <van-icon name="location-o" size="0.3rem" />
          <span>{{address ? address : '暂未获取您的地理位置'}}</span>
        </van-col>
        <van-col :span="4" align="end">
          <van-icon name="point-gift-o" size="0.5rem" />
        </van-col>
        <van-col :span="4" align="end">
          <van-icon name="chat-o" size="0.5rem" />
        </van-col>
      </van-row>
    </van-cell>
    <!-- 搜索框 -->
    <van-search
      class="wp-search align-cell"
      background="#f2f4fa"
      v-model="searchInfo"
      placeholder="请输入搜索关键词"
      @change="onSearch"
    />
    <div class="page-main mb-6">
      <!-- 轮播图 -->
      <van-row class="align-cell">
        <van-swipe
          class="my-swipe"
          :autoplay="3000"
          indicator-color="white"
          loop
          style="height:1.5rem"
        >
          <van-swipe-item v-for="(item,index) in swipeList" :key="index">
            <van-image width="100%" height="100%" :src="item.img" />
          </van-swipe-item>
        </van-swipe>
      </van-row>

      <!-- 九宫格 -->
      <van-grid :border="false" :column-num="4" square class="mt-1">
        <van-grid-item v-for="(item,index) in gridList" :key="index" @click="goGetStore(item.id)">
          <van-image width="0.8rem" height="0.8rem" :src="item.img" round></van-image>
          <span>{{item.name}}</span>
        </van-grid-item>
      </van-grid>
      <!-- 卡片商品 -->
      <div class="align-cell">
        <van-row
          style="display:flex;flex-wrap: wrap;justify-content: space-between;background:#ededed"
        >
          <van-col
            :span="12"
            style="background:#ededed"
            v-for="(item,index) in spList"
            :key="index"
          >
            <van-card class="meau my-1 mx-1" style="background:#fff" @click="goCart(item)">
              <div slot="title">
                <van-image width="2.7rem" height="2.7rem" :src="require('./images/daitui.png')"></van-image>
              </div>
              <div slot="tags">
                <div class="card_title">{{item.name}}</div>
                <div class="card_content mt-1">
                  <div class="card_score mr-1" v-if="item.score">{{item.score}}</div>
                  <div class="card_apprase">{{item.notice}}</div>
                </div>
                <div class="card_price mt-1">
                  <span
                    class="mr-1"
                    style="color:#E62B00;font-size:0.3rem"
                  >￥{{item.price*item.zk/10}}</span>
                  <span
                    class="mr-1"
                    style="color:#ededed;text-decoration:line-through "
                  >￥{{item.price}}</span>
                  <span
                    class="px-1"
                    style="border:1px solid  #FF4419;background:#FFC4B7;color:#FF4419;font-size:0.2rem"
                  >{{item.zk}}折</span>
                </div>
              </div>
            </van-card>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-row
      v-if="!userInfo"
      class="align-cell"
      type="flex"
      justify="space-between"
      align="center"
      style="background:#333;color:#fff"
    >
      <span>您还未登录，权限可能受限,请尽快登录</span>
      <van-button type="primary" size="mini" @click="goLogin">登录</van-button>
    </van-row>
  </div>
</template>

<script>
import { PullRefresh, Search, Swipe, SwipeItem } from 'vant';
import { getPosition } from '@/utils/common.js';
import { get } from '@/api/axios.js';
import { mapMutations, mapGetters } from 'vuex';
export default {
  components: {
    [PullRefresh.name]: PullRefresh,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      address: '', //地址
      userInfo: '', //个人信息
      searchInfo: '', //搜索内容
      swipeList: [
        { img: require('./images/swipe1.png') },
        { img: require('./images/swipe2.png') },
        { img: require('./images/swipe3.png') }
      ],
      spList: [],
      gridList: [
        { name: '快餐', img: require('./images/kc.jpg'), id: 1 },
        { name: '面食', img: require('./images/ms.jpg'), id: 2 },
        { name: '饮品', img: require('./images/yp.jpg'), id: 3 },
        { name: '肉类', img: require('./images/rs.jpg'), id: 4 }
      ]
    };
  },
  created() {
    // this.getaddress();
    this.getSpList();
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo);
  },
  methods: {
    ...mapMutations({
      setId: 'SET_ID'
    }),
    // 去登录信息
    goLogin() {
      this.$router.push({
        path: '/login'
      });
    },
    // 搜索商品
    onSearch() {
      console.log(this.searchInfo);
    },
    //获取地理位置和坐标
    getaddress() {
      getPosition(ptDate => {
        this.address = ptDate.address;
        // this.xjdzb = ptDate.lng + ' ' + ptDate.lat;
      });
    },
    // 去购物车
    goCart(item) {
      this.setId(item.id);
      this.$router.push({
        path: '/cart',
        query: { info: item }
      });
    },
    // 获取商家
    async getSpList() {
      let res = await get('/store/findAll', {});
      if (res.status == 200) {
        this.spList = res.data;
      }
    },
    // 通过分类获取商家
    async goGetStore(id) {
      let params = {
        category_id: id
      };
      let res = await get('/store/findByCategory_id', params);
      if (res.status == 200) {
        this.spList = res.data;
      }
    }
  }
};
</script>
<style lang='less'>
.wp-search .van-search__content {
  border: 1px solid rgba(34, 129, 255, 1);
  border-radius: 0.32rem;
  background: #fff;
}
.wp-search .van-field__left-icon .van-icon,
.wp-search .van-field__right-icon .van-icon {
  color: #c5deff;
}
.wp-search input::-webkit-input-placeholder {
  color: #c5deff;
}
</style>
<style lang="less" scoped>
.meau {
  .card_title {
    font-weight: 700;
  }
  .card_content {
    display: flex;
    .card_score {
      color: #ff4419;
    }
    .card_apprase {
      flex: 1;
      color: #ededed;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>