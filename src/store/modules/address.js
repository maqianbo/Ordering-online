const address = {
  state: {
    addressObj: {}
  },
  mutations: {
    SET_ADDRESS: (state, addressObj) => {
      state.addressObj = addressObj;
    }
  }
}
export default address