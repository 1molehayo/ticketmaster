<template>
  <div class="flw">
    <button
      type="submit"
      class="button button--primary w-100"
      @click="makePayment"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: 'Payment for items in cart',
    },
    amount: {
      type: Number,
      required: true,
    },
    close: {
      type: Function,
      required: true,
      default: () => {},
    },
    callback: {
      type: Function,
      default: () => {},
    },
    currency: {
      type: String,
      default: 'NGN',
    },
    country: {
      type: String,
      default: 'NG',
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    submit: {
      type: Function,
      default: () => {},
    },
    redirectUrl: {
      type: String,
      default: '/',
    },
  },
  computed: {
    reference() {
      let text = ''
      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      return text
    },
  },

  created() {},

  methods: {
    makePayment() {
      if (this.isValid) {
        this.payWithFlutterwave({
          public_key: this.$config.apiPublicKey,
          tx_ref: this.reference,
          amount: this.amount,
          currency: this.currency,
          payment_options: 'card,mobilemoney,ussd',
          customer: {
            name: this.name,
            email: this.email,
            phone_number: this.phone,
          },
          callback: (response) => {
            this.callback(response)
          },
          onclose: () => {
            this.close()
          },
          customizations: {
            title: 'Flutterwave Event Registration',
            description: this.description,
          },
        })
      }
    },
  },
}
</script>
