<template>
  <div class="custom-image__block" :class="className">
    <img
      v-if="!error"
      :class="[
        imgClass,
        { lazyload: loading === 'lazy' && !supportsLoadingAttribute },
      ]"
      :loading="loading"
      v-bind="{ ...sources }"
      :alt="alt"
    />

    <div v-else class="custom-image__error img-rounded">
      <span class="icon-image custom-image__icon"></span>
    </div>
  </div>
</template>

<script>
// base64-encoded transparent GIF
const placeholder =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

export default {
  props: {
    // the props required to compute `srcset` should go here
    loading: {
      type: String,
      default: 'lazy',
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
    }
  },

  computed: {
    sources() {
      if (this.loading === 'lazy' && !this.supportsLoadingAttribute) {
        return {
          'data-src': this.src,
          'data-srcset': this.srcset,

          src: placeholder,
        }
      }

      if (this.srcset) {
        return {
          srcset: this.srcset,
        }
      }

      return {
        srcset: this.src,
      }
    },
  },

  mounted() {
    this.supportsLoadingAttribute = 'loading' in HTMLImageElement.prototype
    this.error = !this.srcset && !this.src
  },
}
</script>
