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
        <div v-if="!noEvents" class="row">
          <div
            v-for="event in events"
            :key="event.id"
            class="col-md-6 col-xl-4 mb-6"
          >
            <LazyEventCard :event-item="event" />
          </div>
        </div>

        <NoEvent v-else />
      </div>
    </section>

    <section v-if="pageInfo.total !== 0 && !noEvents" class="section">
      <div class="container">
        <pagination
          v-model="pageInfo.currentPage"
          theme="bootstrap4"
          class="text-center"
          :records="pageInfo.total"
          :per-page="20"
          :options="paginationOptions"
          @paginate="callback"
        ></pagination>
      </div>
    </section>
  </main>
</template>

<script>
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'
import { getPrice, isFeedbackSuccess } from '~/assets/js/apiFunctions'
import { isArrayEmpty, isObjectEmpty } from '~/assets/js/utility'

const getEventData = (arr, $axios) => {
  return Promise.all(
    arr.map(async (eventObj) => {
      const price = await getPrice(eventObj, $axios)
      return { ...eventObj, price }
    })
  )
}

export default {
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  async asyncData({ store, $axios, error, query }) {
    try {
      let eventQuery = ''
      const queryParams = new URLSearchParams('')

      if (!isObjectEmpty(query) && query.page > 1) {
        queryParams.append('page', query.page)
        eventQuery = `?${queryParams.toString()}`
      }

      const { data } = await $axios.get(`events${eventQuery}`)

      if (!isFeedbackSuccess(data)) {
        const errorMessage = `There was a problem while fetching the event list, please try to refresh your page.`
        error({
          statusCode: 500,
          message: errorMessage,
        })

        return {
          events: [],
          pageInfo: {
            currentPage: 0,
            total: 0,
          },
        }
      }

      const events = await getEventData(data.data.events, $axios)
      const pageInfo = data.data.pageInfo

      store.dispatch('getEvents', {
        pageInfo,
        events,
      })

      return { events, pageInfo }
    } catch (err) {
      error({
        statusCode: err.response ? err.response.status : 500,
        message: err.message || 'Oops!, something went wrong',
      })
    }
  },
  computed: {
    paginationOptions() {
      const texts = {
        count: `Showing page ${this.pageInfo.currentPage} out of ${this.pageInfo.totalPages} pages`,
      }

      if (this.$vssWidth >= 990) {
        return {
          chunk: 10,
          chunksNavigation: 'fixed',
          texts,
        }
      }

      return {
        chunk: 5,
        chunksNavigation: 'scroll',
        texts,
      }
    },

    noEvents() {
      return isArrayEmpty(this.events)
    },
  },
  watchQuery: ['page'],
  methods: {
    callback(page) {
      this.$router.push({ path: '/', query: { page } })
    },
  },
}
</script>
