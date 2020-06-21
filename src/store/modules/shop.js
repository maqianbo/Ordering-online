const shop = {
  state: {
    goods: [],
    price: ''
  },
  mutations: {
    SET_GOODS: (state, goods) => {
      state.goods = goods
    },
    SET_PRICE: (state, price) => {
      state.price = price
    }
  }
}
export default shop;