<template>
  <form @submit.prevent="handleSubmit">
    <div class="form__group" :class="{ 'form__group--error': $v.name.$error }">
      <label class="form__label">Name</label>
      <input v-model.trim="$v.name.$model" class="form__input" />

      <div v-if="!$v.name.required" class="form__error-text">
        Name is required
      </div>
      <div v-if="!$v.name.minLength" class="form__error-text">
        Name must have at least {{ $v.name.$params.minLength.min }} letters.
      </div>
      <div v-if="!$v.name.maxLength" class="form__error-text">
        Name must have a maximum of {{ $v.name.$params.maxLength.min }} letters.
      </div>
    </div>

    <FormField
      id="name"
      v-model.trim="$v.form.name.$model"
      :is-required="true"
      :field="$v.form.name"
      label="Name"
    />

    <button
      class="button button--primary w-100"
      type="submit"
      :disabled="loading"
    >
      {{ buttonText }}
    </button>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import ValidatePhone from '~/assets/js/validatePhone'

export default {
  mixins: [validationMixin],
  props: {
    name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    submit: {
      type: Function,
      // eslint-disable-next-line no-console
      default: () => console.log('submitted Form!'),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      default: 'Submit',
    },
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(30),
    },
    email: {
      required,
      email,
    },
    phone: {
      required,
      ValidatePhone,
    },
  },
  methods: {
    handleSubmit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.submit()
        // eslint-disable-next-line no-console
        console.log('submit!')
      }
    },
  },
}
</script>
