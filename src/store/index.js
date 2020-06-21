import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import home from './modules/home.js'
import shop from './modules/shop.js'
import address from './modules/address.js'
import meau from './modules/meau.js'
import getters from "./getters.js";

const store = new Vuex.Store({
  modules: {
    home,
    shop,
    address,
    meau
  },
  getters
});

export default store;
