<template>
  <div class="qa-input">
    <q-input
      v-model="value"
      :label="label"
      :placeholder="placeholder"
      :type="type"
      :outlined="outlined"
      :dense="dense"
      :clearable="clearable"
      :readonly="readonly"
      :disable="disable"
      :prefix="prefix"
      :suffix="suffix"
      class="qa-input__field" />
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '标签'
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  type: {
    type: String as PropType<
      'text' | 'password' | 'number' | 'email' | 'tel' | 'search' | 'textarea'
    >,
    default: 'text'
  },
  outlined: {
    type: Boolean,
    default: true
  },
  dense: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disable: {
    type: Boolean,
    default: false
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  }
});

const value = ref('');
</script>

<style lang="scss">
@import './style.scss';
</style>
