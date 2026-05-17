<template>
  <div class="qa-carousel">
    <q-carousel
      v-model="slide"
      animated
      :navigation="navigation"
      :autoplay="autoplay"
      :arrows="arrows"
      :interval="interval"
      :height="height"
      :navigation-position="navigationPosition"
      transition-prev="slide"
      transition-next="slide"
      swipeable
      infinite
      class="qa-carousel__content">
      <q-carousel-slide
        v-for="(item, index) in items"
        :key="index"
        :name="index"
        :img-src="item.src"
        class="qa-carousel__slide">
        <div v-if="item.label" class="qa-carousel__label">{{ item.label }}</div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';

interface CarouselItem {
  src: string;
  label?: string;
}

const props = defineProps({
  items: {
    type: Array as PropType<CarouselItem[]>,
    default: () => [
      { src: 'https://cdn.quasar.dev/img/slide1.jpg', label: 'Slide 1' },
      { src: 'https://cdn.quasar.dev/img/slide2.jpg', label: 'Slide 2' },
      { src: 'https://cdn.quasar.dev/img/slide3.jpg', label: 'Slide 3' }
    ]
  },
  height: {
    type: String,
    default: '200px'
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3000
  },
  arrows: {
    type: Boolean,
    default: false
  },
  navigation: {
    type: Boolean,
    default: true
  },
  navigationPosition: {
    type: String as PropType<'bottom'>,
    default: 'bottom'
  }
});

const slide = ref(0);
</script>

<style lang="scss">
@import './style.scss';
</style>
