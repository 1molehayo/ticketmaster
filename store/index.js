import Vuex from 'vuex'
import eventModule from './modules/event'
import orderModule from './modules/order'
import ticketTypeModule from './modules/ticket-type'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      event: eventModule,
      tickeType: ticketTypeModule,
      order: orderModule,
    },
  })
}

export default createStore
