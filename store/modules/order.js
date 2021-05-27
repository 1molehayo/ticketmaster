const state = () => ({
  orders: {},
})

const getters = {}

const mutations = {
  CREATE_ORDER(state, payload) {
    state.orders.push(payload)
  },
  GET_ORDERS(state, payload) {
    state.orders = payload
  },
}

const actions = {
  createOrder({ commit }, payload) {
    commit('CREATE_ORDER', payload)
  },

  getOrders({ commit }, payload) {
    commit('GET_ORDERS', payload)
  },
}

const orderModule = {
  state,
  getters,
  mutations,
  actions,
}

export default orderModule
