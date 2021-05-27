<template>
  <div class="page">
    <Header v-if="!isCartPage" />

    <Nuxt />

    <Footer v-if="!isCartPage" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCartPage: false,
    }
  },
  created() {
    this.isCartPage = this.$route.name === 'cart'
  },
}
</script>
