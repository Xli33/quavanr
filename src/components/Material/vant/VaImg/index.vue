<template>
  <div class="va-img" :style="containerStyle">
    <van-image
      :src="src"
      :width="width"
      :height="height"
      :fit="fit"
      :round="round"
      :radius="radius"
      :alt="alt"
      :lazy-load="lazyLoad"
      class="va-img__content" />
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';

const props = defineProps({
  src: {
    type: String,
    default: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg'
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
    type: String as PropType<'fill' | 'cover' | 'contain' | 'none' | 'scale-down'>,
    default: 'cover'
  },
  round: {
    type: Boolean,
    default: false
  },
  radius: {
    type: String,
    default: '0px'
  },
  alt: {
    type: String,
    default: '图片'
  },
  lazyLoad: {
    type: Boolean,
    default: false
  }
});

const containerStyle = computed(() => ({
  width: props.width,
  height: props.height
}));
</script>

<style lang="scss">
@import './style.scss';
</style>
