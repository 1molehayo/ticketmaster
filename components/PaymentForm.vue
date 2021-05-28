<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormField
      id="name"
      v-model.trim="$v.form.name.$model"
      :is-required="true"
      :field="$v.form.name"
      label="Name"
    />

    <FormField
      id="email"
      v-model.trim="$v.form.email.$model"
      :is-required="true"
      :field="$v.form.email"
      label="Email address"
    />

    <FormField
      id="phone"
      v-model.trim="$v.form.phone.$model"
      :is-required="true"
      :field="$v.form.phone"
      label="Phone number"
    />

    <div class="payment__row pt-5">
      <div class="payment__col">
        <p class="cart__text text-uppercase">Total payment</p>
      </div>

      <div class="payment__col">
        <p>
          <strong>{{ amount }}</strong>
        </p>
      </div>
    </div>

    <FlutterwaveModal
      v-bind="form"
      :amount="total"
      :callback="paymentCallback"
      :close="onCancel"
      :currency="currency"
      :description="description"
      :button-text="buttonText"
      :is-valid="!$v.$invalid"
    />
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { isFeedbackSuccess } from '~/assets/js/apiFunctions'
import { registrationValidations } from '~/assets/js/formValidations'
import { registerModel } from '~/assets/js/models'
import { formatNumberWithComa } from '~/assets/js/utility'

export default {
  mixins: [validationMixin],
  props: {
    cart: {
      type: Array,
      default: () => [],
    },
    goBack: {
      type: Function,
      default: () => {},
    },
    vat: {
      type: Number,
      default: 0,
    },
    subTtotal: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'NGN',
    },
  },
  data() {
    return {
      ...registerModel,
    }
  },
  validations: {
    ...registrationValidations,
  },
  computed: {
    amount() {
      return `${this.currency}${formatNumberWithComa(this.total)}`
    },
    buttonText() {
      return `PAY ${this.amount}`
    },
    totalQuantity() {
      return this.cart.reduce((acc, cartItem) => {
        return cartItem.quantity + acc
      }, 0)
    },
    description() {
      return `Payment for ${this.totalQuantity} tickets on flutterwave events platform`
    },
    ticketsBought() {
      const obj = {}

      this.cart.forEach((item) => {
        obj[item.id] = item.quantity
      })

      return obj
    },
  },
  methods: {
    resetForm() {
      this.form = {
        name: '',
        email: '',
        phone: '',
      }
    },
    handleSubmit() {
      this.$v.$touch()
    },
    async paymentCallback(payResponse) {
      this.$nuxt.$loading.start()

      try {
        //   verify payment
        const verifyResponse = await this.$axios.get(
          `https://api.flutterwave.com/v3/transactions/${payResponse.transaction_id}/verify`,
          {
            baseURL: '',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.$config.apiSecretKey}`,
            },
          }
        )

        if (!isFeedbackSuccess(verifyResponse.data)) {
          throw new Error(
            'There was a problem verifying the transaction, try again'
          )
        }

        //   create order
        const postData = {
          event_id: this.cart.event_id,
          ...this.form,
          base_amount: this.subTtotal,
          value_added_tax: this.vat,
          tickets_bought: `${this.ticketsBought}`,
        }

        const response = await this.$axios.post('orders', postData)

        if (!isFeedbackSuccess(response.data)) {
          throw new Error(
            'There was a problem booking your order, please contact out support center'
          )
        }

        this.$router.push({
          path: '/payment-feedback',
          query: {
            status: 'success',
            tx_ref: payResponse.tx_ref,
            transaction_id: payResponse.transaction_id,
          },
        })

        this.$store.commit('savePaymentStatus', {
          status: 'success',
          tx_ref: payResponse.tx_ref,
          transaction_id: payResponse.transaction_id,
          message:
            'Your tickets have been confirmed and sent to your email address at ted@flutterwave.com',
        })
      } catch (err) {
        this.$router.push({
          path: '/payment-feedback',
          query: {
            status: 'fail',
          },
        })

        this.$store.commit('savePaymentStatus', {
          status: 'fail',
          message:
            err.message ||
            'Oops! there was a problem with this order,  please contact out support center',
        })
      } finally {
        this.resetForm()
        this.$nuxt.$loading.finish()
        this.closePaymentModal()
      }
    },
    onCancel() {},
  },
}
</script>
