<template>
  <div class="page" style="background:#ededed">
    <div class="pt-8 pb-8" style="background:rgb(102,151,223)">
      <van-row type="flex" justify="space-between" align="center" class="align-cell">
        <van-col :span="6">
          <van-image
            width="1.5rem"
            height="1.5rem"
            round
            :src="require('../meau/images/chaoshi.png')"
          ></van-image>
        </van-col>
        <van-col :span="18" style="font-size:0.5rem;color:#fff">{{userInfo.name}}</van-col>
      </van-row>
    </div>
    <van-cell-group class="mt-2">
      <van-cell is-link center @click="goIntroduction">
        <van-row type="flex" align="center">
          <van-col :span="3">
            <van-icon name="location-o" color="rgb(102,151,223)" size="0.5rem" />
          </van-col>
          <van-col :span="21">简介</van-col>
        </van-row>
      </van-cell>
      <van-cell is-link center @click="goAddressPage">
        <van-row type="flex" align="center">
          <van-col :span="3">
            <van-icon name="location-o" color="rgb(102,151,223)" size="0.5rem" />
          </van-col>
          <van-col :span="21">地址管理</van-col>
        </van-row>
      </van-cell>
      <van-cell is-link center @click="goEditUser">
        <van-row type="flex" align="center">
          <van-col :span="3">
            <van-icon name="location-o" color="rgb(102,151,223)" size="0.5rem" />
          </van-col>
          <van-col :span="21">账户安全</van-col>
        </van-row>
      </van-cell>
      <van-cell is-link center @click="goLogout">
        <van-row type="flex" align="center">
          <van-col :span="3">
            <van-icon name="location-o" color="rgb(102,151,223)" size="0.5rem" />
          </van-col>
          <van-col :span="21">退出登录</van-col>
        </van-row>
      </van-cell>
      <!--          <van-cell title="简介" is-link/>
      <van-cell title="退出登录" is-link @click="goLogout" />-->
    </van-cell-group>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      userInfo: {} //个人信息
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  },
  methods: {
    ...mapMutations({
      setActive: 'SET_ACTIVE'
    }),
    // 去地址管理
    goAddressPage() {
      this.$router.push({
        path: '/addressList'
      });
    },
    // 去修改个人账户
    goEditUser() {
      this.$router.push({
        path: '/editUserInfo'
      });
    },
    // 去查看产品简介
    goIntroduction() {
      this.$router.push({
        path: './introduction'
      });
    },
    // 退出登录
    goLogout() {
      this.$dialog
        .confirm({
          title: '退出登录',
          message: '确认要退出登录'
        })
        .then(() => {
          this.setActive('meau');
          localStorage.removeItem('userInfo');
          // location.reload([true]);
          this.$router.push({
            path: '/login'
          });
        });
    }
  }
};
</script>
