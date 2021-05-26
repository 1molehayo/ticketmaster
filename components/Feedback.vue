<template>
  <div class="feedback">
    <span
      v-if="status === 'success'"
      class="icon-check-circle feedback__icon color-primary"
    ></span>

    <div v-else class="feedback__icon-block">
      <span class="icon-close feedback__icon color-red"></span>
    </div>

    <p class="font-bold">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
  },
}
</script>
