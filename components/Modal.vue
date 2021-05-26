<template>
  <section class="modal" :class="{ 'modal--visible': show }">
    <div class="modal__backdrop"></div>

    <div class="modal__wrapper modal__wrapper--trans">
      <div class="modal__header" :class="{ 'modal-header--no-b': !title }">
        <h6 v-if="title" class="mb-0">{{ title }}</h6>
        <button class="modal__close" @click="toggleModal">
          <span class="icon-close"></span>
        </button>
      </div>

      <div class="modal__body">
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    toggleModal: {
      type: Function,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
