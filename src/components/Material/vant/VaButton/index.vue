<template>
  <div class="va-button">
    <van-button
      :text="text"
      :type="type"
      :size="size"
      :color="color || undefined"
      :block="block"
      :round="round"
      :plain="plain"
      :square="square"
      :hairline="hairline"
      :disabled="disabled"
      :loading="loading"
      :icon="icon || undefined"
      class="va-button__btn" />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

defineProps({
  text: {
    type: String,
    default: '按钮'
  },
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'default'>,
    default: 'primary'
  },
  size: {
    type: String as PropType<'large' | 'normal' | 'small' | 'mini'>,
    default: 'normal'
  },
  color: {
    type: String,
    default: ''
  },
  block: {
    type: Boolean,
    default: true
  },
  round: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  },
  square: {
    type: Boolean,
    default: false
  },
  hairline: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  }
});
</script>

<style lang="scss">
@import './style.scss';
</style>
