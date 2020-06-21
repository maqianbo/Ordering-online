const meau = {
  state: {
    id: ''
  },
  mutations: {
    SET_ID: (state, id) => {
      state.id = id
      console.log('state.id', state.id)
    }
  }
}
export default meau;