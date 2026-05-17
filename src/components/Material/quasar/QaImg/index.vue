<template>
  <div class="qa-img" :style="{ width, height }">
    <q-img
      :src="src"
      :width="width"
      :height="height"
      :fit="fit"
      :ratio="ratio || undefined"
      :alt="alt"
      :style="{ borderRadius: radius }"
      class="qa-img__content" />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

defineProps({
  src: {
    type: String,
    default: 'https://cdn.quasar.dev/img/mountains.jpg'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '200px'
  },
  fit: {
    type: String as PropType<'fill' | 'cover' | 'none' | 'contain' | 'scale-down'>,
    default: 'cover'
  },
  ratio: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: '图片'
  },
  radius: {
    type: String,
    default: '0px'
  }
});
</script>

<style lang="scss">
@import './style.scss';
</style>
