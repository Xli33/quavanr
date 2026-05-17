<template>
  <div class="va-input">
    <van-field
      v-model="value"
      :label="label"
      :placeholder="placeholder"
      :type="type"
      :clearable="clearable"
      :readonly="readonly"
      :disabled="disabled"
      :input-align="inputAlign"
      :autosize="autosizeProp"
      :show-word-limit="showWordLimit"
      :maxlength="maxlength || undefined"
      class="va-input__field" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type PropType } from 'vue';

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
    type: String as PropType<'text' | 'password' | 'number' | 'digit' | 'textarea'>,
    default: 'text'
  },
  clearable: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  inputAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  },
  autosize: {
    type: Boolean,
    default: false
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: [String, Number],
    default: ''
  }
});

const value = ref('');

const autosizeProp = computed(() => (props.autosize ? {} : undefined));
</script>

<style lang="scss">
@import './style.scss';
</style>
