<template>
  <div class="col-md-5 offset-md-1">
    <h5>1. single file</h5>
    <form>
      <div class="form-group">
        <label for="my-file">Select Image</label>
        <input
          id="my-file"
          class="form-control-file"
          type="file"
          accept="image/*"
          @change="previewImage"
        />

        <div class="border p-2 mt-3">
          <p>Preview Here:</p>
          <template v-if="preview">
            <img :src="preview" class="img-fluid" />
            <p class="mb-0">file name: {{ image.name }}</p>
            <p class="mb-0">size: {{ image.size / 1024 }}KB</p>
          </template>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      preview: null,
      image: null,
    }
  },
  methods: {
    previewImage(event) {
      const input = event.target
      if (input.files) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.preview = e.target.result
        }
        this.image = input.files[0]
        reader.readAsDataURL(input.files[0])
      }
    },
  },
}
</script>
