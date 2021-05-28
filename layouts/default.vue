<template>
  <div class="page">
    <Header v-if="!isCartPage" />

    <Nuxt />

    <Footer v-if="!isCartPage" />
  </div>
</template>

<script>
export default {
  computed: {
    isCartPage() {
      return this.$route.name === 'cart'
    },
  },
}
</script>
