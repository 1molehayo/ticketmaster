<template>
  <main class="page__body event-details">
    <section class="section pb-0">
      <div class="container">
        <div v-if="!pageHasError" class="row">
          <div class="col-lg-6">
            <h6>{{ eventDate }}</h6>

            <h1>
              <strong>{{ event.name }}</strong>
            </h1>

            <p class="event-details__text">
              <em>{{ event.description }}</em>
            </p>

            <p class="event-details__price">{{ event.price }}</p>

            <div class="row">
              <div class="col-8">
                <button
                  v-if="event && event.is_free"
                  class="button button--primary"
                  @click="toggleModal"
                >
                  Register for free
                </button>

                <button
                  v-else
                  class="button button--primary"
                  @click="selectProduct"
                >
                  Buy tickets
                </button>

                <!-- uncomment to test the free registration -->

                <!-- <button
                  class="button button--primary mt-5"
                  @click="toggleModal"
                >
                  Register for free
                </button> -->
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <CustomImage
              :src="eventImage"
              img-class="img-rounded"
              :alt="event.name"
              class="event-details__image"
            />
          </div>
        </div>

        <hr class="section__divider" />
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 mb-6">
            <h6>Venue</h6>
            <p class="event-details__text--lg">
              <strong>{{ event.venue }}</strong>
            </p>

            <a
              id="map-link"
              :href="'https://www.google.com/maps/search/' + event.venue"
              target="_blank"
            >
              <span class="icon-map"></span> View map for directions
            </a>
          </div>

          <div class="col-lg-6 mb-6">
            <h6>Date and time</h6>

            <p class="event-details__text--lg mb-6">
              <strong>{{ fullEventDate }}</strong>
            </p>

            <h6 class="mb-2 font-size-regular">social links</h6>

            <ul class="event-details__socials">
              <li>
                <a target="_blank" href="http://www.nathanielcole.com"
                  >http://www.nathanielcole.com</a
                >
              </li>
              <li>
                <a target="_blank" href="https://twitter.com/nathanielcole"
                  >https://twitter.com/nathanielcole</a
                >
              </li>
              <li>
                <a target="_blank" href="https://instagram.com/nathanielcole/"
                  >https://instagram.com/nathanielcole/</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <Lines />

    <RegistrationForm
      :show-modal="showModal"
      :toggle-modal="toggleModal"
      :event-name="event.name"
    />
  </main>
</template>

<script>
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'
import { isArrayEmpty, isObjectEmpty } from '~/assets/js/utility'
import {
  getEventDate,
  getOptimizedImage,
  getPrice,
  isFeedbackSuccess,
  updateLocalStorage,
} from '~/assets/js/apiFunctions'

export default {
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  async asyncData({ store, params, $axios, error }) {
    try {
      let event = {}

      const eventList = store.state.event.eventList

      if (!isObjectEmpty(eventList)) {
        event = eventList.events.filter(
          (item) => item.id === Number(params.id)
        )[0]

        return {
          event,
        }
      }

      const { data } = await $axios.get(`events/${params.id}`)

      if (!isFeedbackSuccess(data)) {
        const errorMessage = `There was a problem while fetching the event, please try to refresh your page.`
        error({
          statusCode: 500,
          message: errorMessage,
        })

        return {
          event,
        }
      }

      const price = await getPrice(data.data, $axios)

      return { event: { ...data.data, price } }
    } catch (err) {
      error({
        statusCode: err.response ? err.response.status : 500,
        message: err?.message || 'Oops!, something went wrong',
      })
    }
  },
  data() {
    return {
      showModal: false,
    }
  },
  head() {
    return {
      title: 'Event Details - Flutterwave',
    }
  },
  computed: {
    eventDate() {
      if (!isObjectEmpty(this.event)) {
        return getEventDate(this.event?.start_time, this.$moment)
      }

      return ''
    },

    fullEventDate() {
      if (!isObjectEmpty(this.event)) {
        return getEventDate(this.event?.start_time, this.$moment, true)
      }

      return ''
    },

    eventImage() {
      return getOptimizedImage(this.$vssWidth, this.event?.image)
    },

    pageHasError() {
      return !this.event && isObjectEmpty(this.event)
    },
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },

    async selectProduct() {
      this.$nuxt.$loading.start()

      try {
        const response = await this.$axios.get(
          `ticket-types/events/${this.event.id}`
        )

        if (isArrayEmpty(response.data.data)) {
          throw new Error(
            'There are currently no tickets available, please contact out support center'
          )
        }

        updateLocalStorage('selectedEvent', this.event)
        updateLocalStorage('tickets', response.data.data)

        this.$router.push('/cart')
      } catch (err) {
        this.$nuxt.error({
          statusCode: err.response ? err.response.status : 404,
          message: err?.message || 'Oops!, something went wrong',
        })
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
  },
}
</script>
