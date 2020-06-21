import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

Vue.config.productionTip = false;

import "./assets/less/common.less"; //公共css样式
import "@/views/common/index.js"; //引入vant组件
import "./utils/rem.js"; //使用rem布局
// import './utils/area.js'; //使用地址js

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
