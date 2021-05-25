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
                <button v-if="event.is_free" class="button button--primary">
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
              :src="event.image"
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
                <a href="http://www.nathanielcole.com"
                  >http://www.nathanielcole.com</a
                >
              </li>
              <li>
                <a href="https://twitter.com/nathanielcole"
                  >https://twitter.com/nathanielcole</a
                >
              </li>
              <li>
                <a href="https://instagram.com/nathanielcole/"
                  >https://instagram.com/nathanielcole/</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <Lines />
  </main>
</template>

<script>
import { isArrayEmpty, isObjectEmpty } from '~/assets/js/utility'
import { getEventDate, getPrice } from '~/assets/js/apiFunctions'

export default {
  async asyncData({ store, params, $axios, error }) {
    try {
      if (!isArrayEmpty(store.state.event.eventList)) {
        return {
          event: store.state.event.eventList.filter(
            (item) => item.id === Number(params.id)
          )[0],
        }
      }

      const { data } = await $axios.get(`events/${params.id}`)
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
  },
}
</script>
