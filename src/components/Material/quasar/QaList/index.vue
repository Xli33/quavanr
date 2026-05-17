<template>
  <div class="qa-list">
    <div v-if="title" class="qa-list__header">{{ title }}</div>
    <q-list :dense="dense" :separator="separator" class="qa-list__container">
      <q-item v-for="(item, index) in displayItems" :key="index" clickable v-ripple>
        <q-item-section v-if="item.icon" avatar>
          <q-icon :name="item.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.label }}</q-item-label>
          <q-item-label v-if="item.caption" caption>{{ item.caption }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="item.right" side>
          <q-item-label>{{ item.right }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';

interface ListItem {
  label: string;
  caption?: string;
  icon?: string;
  right?: string;
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
  dense: {
    type: Boolean,
    default: false
  },
  separator: {
    type: Boolean,
    default: true
  },
  items: {
    type: Array as PropType<ListItem[]>,
    default: () => [
      { label: '列表项 1', caption: '描述信息 1', icon: 'star' },
      { label: '列表项 2', caption: '描述信息 2', icon: 'favorite' },
      { label: '列表项 3', caption: '描述信息 3', icon: 'info' }
    ]
  }
});

const displayItems = computed(() => props.items.slice(0, props.count));
</script>

<style lang="scss">
@import './style.scss';
</style>
