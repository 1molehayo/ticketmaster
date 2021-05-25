const state = () => ({
  eventList: [],
})

const getters = {}

const mutations = {
  GET_EVENTS(state, payload) {
    state.eventList = payload
  },
}

const actions = {
  getEvents({ commit }, payload) {
    commit('GET_EVENTS', payload)
  },
}

const eventModule = {
  state,
  getters,
  mutations,
  actions,
}

export default eventModule
