const state = () => ({
  eventList: {},
})

const getters = {
  events(state) {
    return state.eventList.events
  },

  pageInfo(state) {
    return state.eventList.pageInfo
  },
}

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
