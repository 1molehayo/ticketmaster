<template>
  <Modal title="register" :show="showModal" :toggle-modal="closeModal">
    <form v-if="!feedback.status" class="form" @submit.prevent="handleSubmit">
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

      <button
        class="button button--primary w-100 mb-5"
        type="submit"
        :disabled="loading"
        :class="{ 'button--loading': loading }"
      >
        {{ loading ? 'registering...' : 'register' }}
      </button>
    </form>

    <Feedback v-else v-bind="feedback" />
  </Modal>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { isFeedbackSuccess } from '~/assets/js/apiFunctions'
import { registrationValidations } from '~/assets/js/formValidations'
import { registerModel } from '~/assets/js/models'

export default {
  mixins: [validationMixin],
  props: {
    eventName: {
      type: String,
      default: '',
    },
    showModal: {
      type: Boolean,
      default: false,
    },
    toggleModal: {
      type: Function,
      default: null,
    },
  },
  validations: {
    ...registrationValidations,
  },
  data() {
    return {
      ...registerModel,
    }
  },
  mounted() {
    if (this.showModal) {
      this.resetForm()
    }
  },
  methods: {
    resetForm() {
      this.form = {
        name: '',
        email: '',
        phone: '',
      }

      this.$v.form.$reset()

      this.feedback = {
        status: '',
        message: '',
      }
    },
    async handleSubmit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.loading = true

        try {
          const { data } = await this.$axios.post(
            `events/${this.$route.params.id}/register`,
            this.form
          )

          if (isFeedbackSuccess(data)) {
            this.feedback = {
              status: 'success',
              message: `You have successfully registered for the ${this.eventName.toLowerCase()}.`,
            }
            return
          }

          const errorMessage = `There was a problem while registering for the ${this.eventName.toLowerCase()} event, please reach our support center, for more details.`

          throw new Error(errorMessage)
        } catch (err) {
          this.feedback = {
            status: 'fail',
            message: err.message,
          }
        } finally {
          this.loading = false
        }
      }
    },

    closeModal() {
      this.resetForm()
      this.toggleModal()
    },
  },
}
</script>
