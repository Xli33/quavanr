<template>
  <div class="qa-button">
    <q-btn
      :label="label"
      :color="color"
      :size="size"
      :round="round"
      :outline="outline"
      :flat="flat"
      :dense="dense"
      :icon="icon || undefined"
      :disable="disable"
      :loading="loading"
      :unelevated="!outline && !flat"
      class="qa-button__btn" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: '按钮'
  },
  color: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  round: {
    type: Boolean,
    default: false
  },
  outline: {
    type: Boolean,
    default: false
  },
  flat: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  disable: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss">
@import './style.scss';
</style>
