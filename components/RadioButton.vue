<template>
  <div
    :key="option.value"
    class="form__group mb-0"
    :class="{
      'form__group--error': error,
    }"
  >
    <input
      :id="option.label"
      :name="name"
      type="radio"
      class="form__radio"
      :value="option.value"
      @change="$parent.$emit('input', $event.target.value)"
    />

    <label class="form__label form__label--inline" :for="option.label">
      {{ option.label }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    option: {
      required: true,
      type: Object,
    },
    name: {
      type: String,
      default: 'radio-input',
    },
  },
}
</script>
