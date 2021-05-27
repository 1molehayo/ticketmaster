<template>
  <main class="page__body cart">
    <div class="cart__grid">
      <section class="cart__main">
        <div class="container">
          <div class="cart__main-header">
            <div class="cart__button-group">
              <nuxt-link to="/" class="button button--capsule"
                ><span class="icon-close"></span>
                Close
              </nuxt-link>

              <button class="button cart__toggler" @click="toggleCart">
                <span class="icon-shopping-cart"></span>
              </button>
            </div>

            <h1>The Nathan Cole Experience</h1>
            <p class="grey-shade3 text-uppercase">8th February 2019</p>
          </div>

          <div class="cart__main-body">
            <table class="cart__main-table">
              <tbody>
                <tr v-for="ticket in getTickets" :key="ticket.id">
                  <td>{{ ticket.name }}</td>

                  <td>
                    <strong>{{ formatAmount(ticket.price) }}</strong>
                  </td>

                  <td>
                    <button class="cart__button" @click="reduce(ticket)">
                      <span class="icon-minus"></span>
                    </button>

                    <span>{{ ticket.quantity }}</span>

                    <button class="cart__button" @click="add(ticket)">
                      <span class="icon-plus"></span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <p class="cart__text color-grey-shade3">
              Ticket sales ends on {{ ticketDate }}
            </p>
          </div>
        </div>
      </section>

      <section class="cart__sidebar">
        <div
          class="sidebar__content"
          :class="{ 'sidebar__content--show': showCart }"
        >
          <client-only>
            <div class="sidebar__buttons">
              <button class="button cart__toggler" @click="toggleCart">
                <span class="icon-close"></span>
              </button>

              <button
                v-if="!firstTabActive"
                class="button cart__go-back"
                @click="prevTab"
              >
                <span class="icon-arrow-left"></span> Go back
              </button>
            </div>

            <Summary
              v-if="firstTabActive"
              :next-tab="nextTab"
              :cart="cart"
              :sub-total="subtotal"
              :total="total"
              :vat="vat"
              :currency="currency"
            />

            <PaymentForm
              v-else
              :cart="cart"
              :total="total"
              :currency="currency"
              :vat="vat"
              :sub-total="subtotal"
            />

            <div v-if="!isCartEmpty" class="payment__assurance">
              <span class="icon-badge"></span>
              <div>
                <p><strong>100% customer protection</strong></p>
                <p>Money back guarantee</p>
              </div>
            </div>
          </client-only>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import {
  getEventDate,
  getLocalStoreItem,
  updateLocalStorage,
} from '~/assets/js/apiFunctions'
import { cartModel } from '~/assets/js/models'
import {
  formatNumberWithComa,
  isArrayEmpty,
  isObjectEmpty,
} from '~/assets/js/utility'

export default {
  data() {
    return {
      ...cartModel,
    }
  },
  head() {
    return {
      title: 'Cart - Flutterwave event',
    }
  },
  computed: {
    isCartEmpty() {
      return isArrayEmpty(this.cart)
    },

    isCartAvailable() {
      return !isArrayEmpty(this.tickets) && !isObjectEmpty(this.event)
    },

    eventDate() {
      if (!isObjectEmpty(this.event)) {
        return getEventDate(this.event?.start_time, this.$moment)
      }

      return ''
    },
    ticketDate() {
      if (!isObjectEmpty(this.event)) {
        return getEventDate(this.event?.tickets_sale_end_date, this.$moment)
      }

      return ''
    },
    getTickets() {
      if (!this.isCartAvailable) {
        return []
      }

      return this.tickets.map((item) => {
        const index = this.cart.findIndex((elem) => elem.id === item.id)

        return {
          ...item,
          quantity: index === -1 ? 0 : this.cart[index].quantity,
        }
      })
    },
    currency() {
      if (this.isCartEmpty) {
        return 'NGN'
      }

      return this.cart[0].ticket.currency
    },
    firstTabActive() {
      return this.activeTab === 1
    },
    subtotal() {
      if (this.isCartEmpty) {
        return 0
      }

      return this.cart.reduce((acc, cartItem) => {
        return cartItem.amount + acc
      }, 0)
    },
    total() {
      return Number(this.subtotal) + Number(this.vat)
    },
  },
  created() {
    this.cart = getLocalStoreItem('cart', [])
    this.event = getLocalStoreItem('selectedEvent', {})
    this.tickets = getLocalStoreItem('tickets', [])

    // remove outdated items
    if (!isArrayEmpty(this.cart)) {
      this.cart = this.cart.filter((item) => {
        const index = this.tickets.findIndex((elem) => elem.id === item.id)

        return index !== -1
      })

      // update store
      updateLocalStorage('cart', this.cart)
    }
  },
  methods: {
    add(item) {
      const index = this.cart.findIndex((elem) => elem.id === item.id)

      if (index === -1) {
        this.cart = [
          {
            id: item.id,
            ticket: item,
            quantity: 1,
            event_id: this.event.id,
            amount: item.price,
          },
        ]
      } else {
        this.cart[index].quantity++
        this.cart[index].amount =
          this.cart[index].ticket.price * this.cart[index].quantity
      }

      updateLocalStorage('cart', this.cart)
    },
    reduce(item) {
      const index = this.cart.findIndex((elem) => elem.id === item.id)

      if (index !== -1) {
        this.cart = this.cart
          .map((cartItem) => {
            if (cartItem.id === item.id) {
              const obj = { ...cartItem }
              obj.quantity -= 1
              obj.amount = obj.ticket.price * obj.quantity

              return obj
            }

            return cartItem
          })
          .filter((elem) => elem.quantity > 0)

        updateLocalStorage('cart', this.cart)
      }
    },
    nextTab() {
      this.activeTab = 2
    },
    prevTab() {
      this.activeTab = 1
    },
    toggleCart() {
      this.showCart = !this.showCart
    },
    formatAmount(val) {
      return `${this.currency}${formatNumberWithComa(val)}`
    },
  },
}
</script>
