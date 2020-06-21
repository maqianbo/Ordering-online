<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="child-view"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive" class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: 'van-slide-right'
    };
  },
  beforeRouteUpdate(to, from, next) {
    let isBack = this.$router.isBack;
    if (isBack) {
      this.transitionName = 'van-slide-left';
    } else {
      this.transitionName = 'van-slide-right';
    }
    this.$router.isBack = false;
    next();
  }
};
</script>
<style lang="less" scoped>
#app {
  height: 100%;
}
.slide-left-enter {
  opacity: 0;
  transform: translate(100%, 0);
}
.slide-right-enter {
  opacity: 0;
  transform: translate(-100%, 0);
}
</style>
