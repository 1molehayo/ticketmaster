<template>
  <main class="page__body payment-fb">
    <section class="section pb-0">
      <div class="container">
        <client-only>
          <div
            class="payment-fb__card"
            :class="{ 'payment-fb__card--auto': !showForm }"
          >
            <div class="payment-fb__form"></div>

            <div class="payment-fb__feedback">
              <Feedback :status="status" :message="message" />

              <nuxt-link to="/" class="button button--primary w-100 mt-5">
                {{ getButtonText }}
              </nuxt-link>
            </div>
          </div>
        </client-only>
      </div>
    </section>

    <Lines />
  </main>
</template>

<script>
import { clearLocalStorage } from '~/assets/js/apiFunctions'

export default {
  async asyncData({ $config, $axios, query }) {
    clearLocalStorage()

    // eslint-disable-next-line no-console
    console.log(
      `https://api.flutterwave.com/v3/transactions/${query.transaction_id}/verify`
    )

    const { data } = await $axios({
      method: 'get',
      url: `https://api.flutterwave.com/v3/transactions/${query.transaction_id}/verify`,
      baseURL: '',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${$config.apiSecretKey}`,
      },
    })

    // eslint-disable-next-line no-console
    console.log(`status >>> ${data.status}`)

    if (data.status === 'success') {
      return {
        status: 'success',
        message:
          'Your tickets have been confirmed and sent to your email address at ted@flutterwave.com',
      }
    }

    return {
      status: 'fail',
      message: 'There was a problem verifying the transaction, try again',
    }
  },
  data() {
    return {
      email: '',
      activeTab: 1,
    }
  },
  computed: {
    showForm() {
      return this.activeTab === 1
    },
    getButtonText() {
      if (this.status === 'success') {
        return 'BUY MORE TICKETS'
      }

      return 'Try other events'
    },
  },
}
</script>
