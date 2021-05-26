<template>
  <div class="form__radio-group">
    <RadioButton
      v-for="option in options"
      :key="option.value"
      :option="option"
      :name="name"
      :error="error"
    />
  </div>
</template>

<script>
export default {
  props: {
    options: {
      required: true,
      type: Array,
    },
    error: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: 'radio-input',
    },
  },
}
</script>
