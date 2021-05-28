<template>
  <main class="page__body payment-fb">
    <section class="section pb-0">
      <div class="container">
        <p class="payment-fb__text">
          <strong>
            Enter your email and we’ll send your tickets right away!
          </strong>
        </p>
        <div
          class="payment-fb__card"
          :class="{ 'payment-fb__card--auto': showForm }"
        >
          <div v-if="showForm" class="payment-fb__form">
            <FormField
              id="email"
              v-model.trim="$v.email.$model"
              :is-required="true"
              :field="$v.email"
              label="Email address"
            />

            <button class="button button--primary w-100" @click="nextTab">
              CONFIRM AND SEND TICKET
            </button>
          </div>

          <div v-else class="payment-fb__feedback">
            <Feedback :status="status" :message="message" />

            <nuxt-link to="/" class="button button--primary w-100 mt-5">
              {{ getButtonText }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>

    <Lines />
  </main>
</template>

<script>
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { clearLocalStorage } from '~/assets/js/apiFunctions'
import { isObjectEmpty } from '~/assets/js/utility'

export default {
  mixins: [validationMixin],
  data() {
    return {
      email: '',
      activeTab: 1,
    }
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  computed: {
    ...mapState({
      paymentStatus: (state) => state.paymentStatus,
    }),
    message() {
      if (!isObjectEmpty(this.paymentStatus)) {
        return this.paymentStatus.message
      }

      if (this.$route.query.status === 'success') {
        return 'Your tickets have been confirmed and sent to your email address at ted@flutterwave.com'
      }

      return 'Oops! there was a problem with this order,  please contact out support center'
    },
    status() {
      if (!isObjectEmpty(this.paymentStatus)) {
        return this.paymentStatus.status
      }

      if (this.$route.query.status) {
        return this.$route.query.status
      }

      return 'fail'
    },
    showForm() {
      return this.activeTab === 1 && this.status === 'success'
    },
    getButtonText() {
      if (this.status === 'success') {
        return 'BUY MORE TICKETS'
      }

      return 'Try other events'
    },
  },
  created() {
    clearLocalStorage()
  },
  methods: {
    nextTab() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.activeTab = 2
      }
    },
  },
}
</script>
