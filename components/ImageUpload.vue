<template>
  <div
    class="form__group"
    :class="{
      'form__group--error': error,
    }"
  >
    <label class="form__label" for="image"
      >Upload picture
      <em class="color-grey-shade3">(png, jpg, svg, gif)</em></label
    >

    <div class="form__file-wrapper">
      <input
        id="image"
        ref="imageInput"
        type="file"
        accept="image/*"
        class="form__file"
        @input="pickFile"
      />

      <label tabindex="0" for="my-file" class="form__file-trigger"
        >Select a file...</label
      >

      <p class="file-return">{{ filename }}</p>
    </div>

    <p v-if="error" class="form__error-text">
      This file size is {{ filesize }} MiB, maximum of 2MiB allowed
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filename: null,
      imagesize: 0,
    }
  },
  computed: {
    error() {
      return this.imagesize && this.imagesize / (1024 * 1024) > 1
    },
    filesize() {
      return Number(this.imagesize / (1024 * 1024)).toFixed(2)
    },
  },
  methods: {
    pickFile() {
      const input = this.$refs.imageInput
      const files = input.files

      if (files && files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.$emit('input', e.target.result)
        }
        reader.readAsDataURL(files[0])
        this.filename = files[0].name
        this.imagesize = files[0].size
      }
    },
  },
}
</script>
