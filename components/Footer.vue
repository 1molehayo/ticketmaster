<template>
  <footer class="footer">
    <div class="container footer__container">
      <ul class="footer__links">
        <li>
          <a href="https://flutterwave.com/ng/terms" class="footer__text">
            Terms &amp; Conditions
          </a>
        </li>

        <li>
          <a
            href="https://flutterwave.com/ng/privacy-policy"
            class="footer__text"
          >
            Privacy Policy
          </a>
        </li>
      </ul>

      <p class="footer__text">Copyright {{ year }}. Flutterwave inc</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>
