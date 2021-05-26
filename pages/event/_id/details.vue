<template>
  <main class="page__body event-details">
    <section class="section pb-0">
      <div class="container">
        <div class="row">
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
                  v-if="event.is_free"
                  class="button button--primary"
                  @click="toggleModal"
                >
                  Register for free
                </button>

                <nuxt-link v-else class="button button--primary" to="/cart">
                  Buy tickets
                </nuxt-link>
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

    <Modal :has-header="true" :show="showModal" :toggle-modal="toggleModal">
      <RegistrationForm
        v-if="!feedback.status"
        v-bind="form"
        :loading="loading"
        button-text="register"
      />

      <Feedback v-else v-bind="feedback" />
    </Modal>
  </main>
</template>

<script>
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'
import { isObjectEmpty } from '~/assets/js/utility'
import {
  getEventDate,
  getOptimizedImage,
  getPrice,
} from '~/assets/js/apiFunctions'

export default {
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  async asyncData({ store, params, $axios, error, redirect }) {
    try {
      const eventList = store.state.event.eventList

      if (!isObjectEmpty(eventList)) {
        return {
          event: eventList.events.filter(
            (item) => item.id === Number(params.id)
          )[0],
        }
      }

      const { data } = await $axios.get(`events/${params.id}`)

      if (isObjectEmpty(data.data)) {
        redirect('/')
      }

      const price = await getPrice(data.data, $axios)

      return { event: { ...data.data, price } }
    } catch (err) {
      error({
        statusCode: err.response ? err.response.status : 404,
        message: err.response
          ? err.response.data
          : 'Oops!, something went wrong',
      })
    }
  },

  data() {
    return {
      showModal: false,
      form: {
        name: '',
        email: '',
        phone: '',
      },
      loading: false,
      feedback: {
        status: '',
        message: '',
      },
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
  },

  methods: {
    toggleModal() {
      this.showModal = !this.showModal

      if (this.showModal) {
        this.form = {
          name: '',
          email: '',
          phone: '',
        }

        this.feedback = {
          status: '',
          message: '',
        }
      }
    },
    async handleSubmit() {
      try {
        const { data } = await this.$axios.post(
          `event/${this.$route.params.id}/register`,
          this.form
        )
        // eslint-disable-next-line no-console
        console.log('register success', data)
        this.feedback = {
          status: 'success',
          message: `You have successfully registered for the ${this.event.name.toLowerCase()}.`,
        }
      } catch (error) {
        this.feedback = {
          status: 'success',
          message: `You have successfully registered for the ${this.event.name.toLowerCase()}.`,
        }
      }
    },
  },
}
</script>
