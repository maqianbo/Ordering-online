const getters = {
  active: state => state.home.active,//状态
  goods: state => state.shop.goods,//购物商品
  price: state => state.shop.price,//商品价格
  address: state => state.address.addressObj,//商品价格
  id: state => state.meau.id,//商家id
}
export default getters;