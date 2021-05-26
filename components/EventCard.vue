<template>
  <figure class="event">
    <CustomImage
      :src="eventImage"
      img-class="img-rounded"
      :alt="eventItem.name"
      class="event__image"
    />

    <figcaption>
      <p class="event__date">{{ eventDate }}</p>
      <p v-if="eventItem.is_sold_out" class="event__name">
        {{ eventItem.name }}
      </p>
      <nuxt-link
        v-else
        class="event__name"
        :to="{ path: `event/${eventItem.id}/details` }"
      >
        {{ eventItem.name }}
      </nuxt-link>
      <p class="event__price" :class="price.class && 'color-' + price.class">
        {{ price.value }}
      </p>
    </figcaption>
  </figure>
</template>

<script>
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'
import { getEventDate, getOptimizedImage } from '~/assets/js/apiFunctions'

export default {
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  props: {
    eventItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    eventDate() {
      return getEventDate(this.eventItem.start_time, this.$moment)
    },

    price() {
      if (this.eventItem.is_free) {
        return {
          class: 'green',
          value: 'Free',
        }
      }

      if (this.eventItem.is_sold_out) {
        return {
          class: 'red',
          value: 'Sold out',
        }
      }

      return {
        class: '',
        value: this.eventItem.price,
      }
    },

    eventImage() {
      return getOptimizedImage(this.$vssWidth, this.eventItem.image)
    },
  },
  methods: {},
}
</script>
