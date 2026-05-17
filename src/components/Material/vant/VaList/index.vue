<template>
  <div class="va-list">
    <div v-if="title" class="va-list__header">{{ title }}</div>
    <van-cell-group :border="border" class="va-list__container">
      <van-cell
        v-for="(item, index) in displayItems"
        :key="index"
        :title="item.label"
        :label="item.caption"
        :icon="item.icon || undefined"
        :is-link="!!item.link"
        :value="item.right" />
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';

interface ListItem {
  label: string;
  caption?: string;
  icon?: string;
  right?: string;
  link?: string;
}

const props = defineProps({
  title: {
    type: String,
    default: '列表标题'
  },
  count: {
    type: Number,
    default: 3
  },
  border: {
    type: Boolean,
    default: true
  },
  items: {
    type: Array as PropType<ListItem[]>,
    default: () => [
      { label: '列表项 1', caption: '描述信息 1', icon: 'location-o' },
      { label: '列表项 2', caption: '描述信息 2', icon: 'star-o' },
      { label: '列表项 3', caption: '描述信息 3', icon: 'fire-o' }
    ]
  }
});

const displayItems = computed(() => props.items.slice(0, props.count));
</script>

<style lang="scss">
@import './style.scss';
</style>
