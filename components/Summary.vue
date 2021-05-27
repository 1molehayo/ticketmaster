<template>
  <client-only>
    <div v-if="empty" class="cart__empty">
      <span class="icon-shopping-cart"></span>
      <p>Cart is empty</p>
    </div>

    <div v-else>
      <h5>order summary</h5>

      <div class="summary-screen">
        <div v-for="cartItem in cart" :key="cartItem.id" class="payment__row">
          <div class="payment__col">
            <p class="cart__text">
              {{ cartItem.quantity }} - {{ cartItem.ticket.name }}
            </p>
          </div>
          <div class="payment__col">
            <p class="cart__text">
              {{ formatAmount(cartItem.amount) }}
            </p>
          </div>
        </div>
      </div>

      <hr class="section__divider" />

      <div class="payment__container">
        <div class="payment__row">
          <div class="payment__col">
            <p class="cart__text">Sub-total</p>
          </div>
          <div class="payment__col">
            <p class="cart__text">{{ formatAmount(subTotal) }}</p>
          </div>
        </div>

        <div class="payment__row">
          <div class="payment__col">
            <p class="cart__text">VAT</p>
          </div>
          <div class="payment__col">
            <p class="cart__text">{{ formatAmount(vat) }}</p>
          </div>
        </div>

        <div class="payment__row">
          <div class="payment__col">
            <p class="cart__text text-uppercase">Total payment</p>
          </div>

          <div class="payment__col">
            <p>
              <strong>{{ formatAmount(total) }}</strong>
            </p>
          </div>
        </div>

        <button
          class="button button--primary w-100"
          type="submit"
          @click="nextTab"
        >
          continue
        </button>
      </div>
    </div>
  </client-only>
</template>

<script>
import { formatNumberWithComa, isArrayEmpty } from '~/assets/js/utility'

export default {
  props: {
    cart: {
      type: Array,
      default: () => [],
    },
    nextTab: {
      type: Function,
      default: () => {},
    },
    subTotal: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    vat: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'NGN',
    },
  },
  computed: {
    empty() {
      return isArrayEmpty(this.cart)
    },
  },
  methods: {
    formatAmount(val) {
      return `${this.currency}${formatNumberWithComa(val)}`
    },
  },
}
</script>
