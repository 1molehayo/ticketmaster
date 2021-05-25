<template>
  <main class="page__body home">
    <section class="section home__header">
      <div class="container">
        <h1 class="color-dark-shade1">
          <strong>The best events happening now.</strong>
        </h1>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="row">
          <div
            v-for="event in events"
            :key="event.id"
            class="col-md-6 col-xl-4 mb-6"
          >
            <EventCard :event-item="event" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { getPrice } from '~/assets/js/apiFunctions'

const getEventData = (arr, $axios) => {
  return Promise.all(
    arr.map(async (eventObj) => {
      const price = await getPrice(eventObj, $axios)
      return { ...eventObj, price }
    })
  )
}

export default {
  async asyncData({ store, $axios, error }) {
    try {
      const { data } = await $axios.get('events')
      const events = await getEventData(data.data.events, $axios)
      store.dispatch('getEvents', events)

      return { events }
    } catch (err) {
      error({
        statusCode: err.response ? err.response.status : 500,
        message: err.response
          ? err.response.data
          : 'Oops!, something went wrong',
      })
    }
  },
}
</script>
