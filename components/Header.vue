<template>
  <header class="header">
    <div class="container header__container">
      <nuxt-link id="fw-logo" to="/">
        <Logo />
      </nuxt-link>

      <nav class="header__nav" :class="{ open: isOpen }">
        <ul class="header__nav-list header__nav-list-pos">
          <li class="header__nav-item">
            <nuxt-link to="/" class="header__nav-link">
              I didn't get my tickets
            </nuxt-link>
          </li>

          <li class="header__nav-item header__nav-item--hod">
            <a href="mailto:hi@flutterwavego.com" class="header__nav-link">
              Contact Us
            </a>
          </li>

          <li class="header__nav-item header__nav-item--hod">
            <a
              href="https://flutterwave.com/ng/privacy-policy"
              class="header__nav-link"
            >
              Privacy Policy
            </a>
          </li>

          <li class="header__nav-item header__nav-item--hod">
            <a
              href="https://flutterwave.com/ng/cookies-policy"
              class="header__nav-link"
            >
              Cookies Policy
            </a>
          </li>

          <li class="header__nav-item header__nav-item--hod">
            <a href="https://flutterwave.com/ng/terms" class="header__nav-link">
              Terms &amp; Conditions
            </a>
          </li>

          <li class="header__nav-item">
            <nuxt-link to="/event/create" class="button button--primary">
              create your own event
            </nuxt-link>
          </li>
        </ul>

        <button class="header__nav-toggler" @click="toggleMenu">
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>
