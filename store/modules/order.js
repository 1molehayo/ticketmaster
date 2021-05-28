const state = () => ({
  orders: {},
  paymentStatus: {},
})

const getters = {}

const mutations = {
  CREATE_ORDER(state, payload) {
    state.orders.push(payload)
  },
  GET_ORDERS(state, payload) {
    state.orders = payload
  },
  SAVE_STATUS(state, payload) {
    state.paymentStatus = payload
  },
}

const actions = {
  createOrder({ commit }, payload) {
    commit('CREATE_ORDER', payload)
  },

  getOrders({ commit }, payload) {
    commit('GET_ORDERS', payload)
  },
  savePaymentStatus({ commit }, payload) {
    commit('SAVE_STATUS', payload)
  },
}

const orderModule = {
  state,
  getters,
  mutations,
  actions,
}

export default orderModule
