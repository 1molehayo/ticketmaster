const state = () => ({
  ticketType: {},
  eventTicketTypes: {},
})

const getters = {}

const mutations = {
  GET_EVENT_TICKET_TYPES(state, payload) {
    state.eventTicketTypes = payload
  },
}

const actions = {
  getEventTicketTypes({ commit }, payload) {
    commit('GET_EVENT_TICKET_TYPES', payload)
  },
}

const ticketTypeModule = {
  state,
  getters,
  mutations,
  actions,
}

export default ticketTypeModule
