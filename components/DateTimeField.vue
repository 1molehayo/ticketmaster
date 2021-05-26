<template>
  <div class="col-md-6">
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

      <slot></slot>

      <p v-if="!required" class="form__error-text">{{ label }} is required</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
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
}
</script>
