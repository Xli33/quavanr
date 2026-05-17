<template>
  <div class="va-carousel">
    <van-swipe
      :autoplay="autoplay ? interval : 0"
      :duration="duration"
      :indicator="indicator"
      indicator-color="#fff"
      :vertical="vertical"
      :touchable="touchable"
      :height="height"
      class="va-carousel__content">
      <van-swipe-item v-for="(item, index) in items" :key="index" class="va-carousel__item">
        <van-image
          :src="item.src"
          fit="cover"
          :width="'100%'"
          :height="height + 'px'"
          class="va-carousel__img" />
        <div v-if="item.label" class="va-carousel__label">{{ item.label }}</div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

interface CarouselItem {
  src: string;
  label?: string;
}

defineProps({
  items: {
    type: Array as PropType<CarouselItem[]>,
    default: () => [
      { src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg' },
      { src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg' },
      { src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg' }
    ]
  },
  height: {
    type: Number,
    default: 200
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3000
  },
  duration: {
    type: Number,
    default: 500
  },
  indicator: {
    type: Boolean,
    default: true
  },
  vertical: {
    type: Boolean,
    default: false
  },
  touchable: {
    type: Boolean,
    default: true
  }
});
</script>

<style lang="scss">
@import './style.scss';
</style>
