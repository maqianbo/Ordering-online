import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

VueRouter.prototype.goBack = function () {
  this.isBack = true;
  this.go(-1);
};

const routes = [
  {
    path: "/",
    redirect: '/login',
  },
  {
    path: "/home",
    name: "home",
    component: resolve => require(["@/views/home/index.vue"], resolve),
  },
  /******************登录页************************************/
  {
    path: "/login",
    name: "login",
    component: resolve => require(["@/views/login/index.vue"], resolve),
  },
  {
    path: "/register",
    name: "register",
    component: resolve => require(["@/views/login/register.vue"], resolve),
  },
  {
    path: "/findPass",
    name: "findPass",
    component: resolve => require(["@/views/login/findPass.vue"], resolve),
  },
  {
    path: "/modifyPass",
    name: "modifyPass",
    component: resolve => require(["@/views/login/modifyPass.vue"], resolve),
  },
  /********************************菜单模块*********************************/
  {
    path: "/meau",
    name: "meau",
    component: resolve => require(["@/views/meau/index.vue"], resolve),
  },
  {
    path: "/cart",
    name: "cart",
    component: resolve => require(["@/views/meau/cart.vue"], resolve),
    redirect: '/cart/shopMeau',
    children: [
      {
        path: "shopMeau",
        name: "shopMeau",
        component: resolve => require(["@/views/meau/shopMeau.vue"], resolve),
      },
      {
        path: "appraise",
        name: "appraise",
        component: resolve => require(["@/views/meau/appraise.vue"], resolve),
      },
      {
        path: "storeInfo",
        name: "storeInfo",
        component: resolve => require(["@/views/meau/storeInfo.vue"], resolve),
      },
    ]
  },
  /********************************订单信息*********************************/
  {
    path: "/order",
    name: "order",
    component: resolve => require(["@/views/order/index.vue"], resolve),
  },
  {
    path: "/addOrder",
    name: "addOrder",
    component: resolve => require(["@/views/order/addOrder.vue"], resolve),
  },
  {
    path: "/appraiseOrder",
    name: "appraiseOrder",
    component: resolve => require(["@/views/order/appraiseOrder.vue"], resolve),
  },
  /********************************个人信息*********************************/
  // 地址信息
  {
    path: "/addressList",
    name: "addressList",
    component: resolve => require(["@/views/user/addressList.vue"], resolve),
  },
  {
    path: "/addressOpera",
    name: "addressOpera",
    component: resolve => require(["@/views/user/addressOpera.vue"], resolve),
  },
  // 账户安全
  {
    path: "/editUserInfo",
    name: "editUserInfo",
    component: resolve => require(["@/views/user/editUserInfo.vue"], resolve),
  },
  {
    path: "/editTel",
    name: "editTel",
    component: resolve => require(["@/views/user/userInfo/editTel.vue"], resolve),
  },
  // 产品简介
  {
    path: "/introduction",
    name: "introduction",
    component: resolve => require(["@/views/user/introduction.vue"], resolve),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
});

const whiteList = ['/login', '/register', '/findPass', '/modifyPass', '/meau'];//白名单

router.beforeEach((to, from, next) => {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo) {
    if (to.path == '/login') {
      next('/home');
    } else {
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})

export default router;
