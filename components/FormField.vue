<template>
  <div
    class="form__group"
    :class="{
      'form__group--error': error,
    }"
  >
    <label class="form__label" :for="id">
      {{ label }}
      <span v-if="isRequired" class="color-red">*</span>
    </label>

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :value="model"
      class="form__text-area"
      rows="4"
      @input="$emit('input', $event.target.value)"
    />

    <input
      v-if="type === 'text'"
      :id="id"
      :value="model"
      class="form__input"
      @input="$emit('input', $event.target.value)"
    />

    <p v-if="!required" class="form__error-text">{{ label }} is required</p>

    <p v-if="!maxLength && maxError" class="form__error-text">
      {{ label }} must have a maximum of {{ maxError }} letters.
    </p>

    <p v-if="!minLength && minError" class="form__error-text">
      {{ label }} must have a maximum of {{ minError }} letters.
    </p>

    <p v-if="!numeric" class="form__error-text">{{ label }} must a number</p>

    <p v-if="!email" class="form__error-text">{{ label }} is invalid</p>

    <p v-if="!phone" class="form__error-text">{{ label }} is invalid</p>

    <!-- {{ field }} -->
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default: () => ({}),
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    id: {
      type: String,
      default: '',
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    error() {
      if (Object.keys(this.field).includes('$error')) {
        return this.field.$error
      }
      return false
    },
    model() {
      if (Object.keys(this.field).includes('$model')) {
        return this.field.$model
      }
      return ''
    },
    required() {
      if (Object.keys(this.field).includes('required')) {
        return this.field.required
      }
      return false
    },
    maxLength() {
      if (Object.keys(this.field).includes('maxLength')) {
        return this.field.maxLength
      }
      return true
    },
    minLength() {
      if (Object.keys(this.field).includes('minLength')) {
        return this.field.minLength
      }
      return true
    },
    numeric() {
      if (Object.keys(this.field).includes('numeric')) {
        return this.field.numeric
      }
      return true
    },
    minError() {
      if (Object.keys(this.field).includes('$params')) {
        return this.field.$params?.minLength?.min
      }
      return ''
    },
    maxError() {
      if (Object.keys(this.field).includes('$params')) {
        return this.field.$params?.maxLength?.min
      }
      return ''
    },
    email() {
      if (Object.keys(this.field).includes('email')) {
        return this.field.email
      }
      return true
    },
    phone() {
      if (Object.keys(this.field).includes('phone')) {
        return this.field.phone
      }
      return true
    },
  },
}
</script>
