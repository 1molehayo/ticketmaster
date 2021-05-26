<template>
  <div class="custom-image__block" :class="[className, { errorblock: error }]">
    <div v-if="error || loading" class="custom-image__error img-rounded">
      <span v-if="error" class="icon-image custom-image__icon"></span>
      <span v-else class="custom-image__loader"></span>
    </div>

    <img
      v-if="!error"
      :class="[
        imgClass,
        {
          lazyload: lazyLoading && !supportsLoadingAttribute,
          loading: 'loading',
        },
      ]"
      :loading="loadingType"
      v-bind="{ ...sources }"
      :alt="alt"
      @load="onLoaded"
    />
  </div>
</template>

<script>
export default {
  props: {
    lazyLoading: {
      type: Boolean,
      default: true,
    },
    src: {
      type: String,
      default: '',
    },
    srcset: {
      type: String,
      default: '',
    },
    imgClass: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      supportsLoadingAttribute: false,
      error: false,
      loading: true,
    }
  },

  computed: {
    sources() {
      return {
        'data-src': this.src,
        'data-srcset': this.srcset,
        srcset: this.srcset,
        src: this.src,
      }
    },
    loadingType() {
      return this.lazyLoading ? 'lazy' : 'eager'
    },
  },

  mounted() {
    this.supportsLoadingAttribute = 'loading' in HTMLImageElement.prototype
    this.error = !this.srcset && !this.src
  },

  methods: {
    onLoaded() {
      this.loading = false
    },
  },
}
</script>
