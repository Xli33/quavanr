<template>
  <div class="config-qa-carousel">
    <q-form class="q-gutter-y-sm">
      <q-input v-model="model.height" label="高度" dense outlined />
      <q-input-number
        v-model="model.interval"
        label="间隔(ms)"
        :min="1000"
        :step="500"
        dense
        outlined />
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <q-checkbox v-model="model.autoplay" label="自动播放" dense />
        </div>
        <div class="col-6">
          <q-checkbox v-model="model.arrows" label="箭头切换" dense />
        </div>
      </div>
      <q-checkbox v-model="model.navigation" label="导航指示器" dense />

      <q-separator />
      <div class="text-subtitle2">轮播图片编辑（拖拽排序）</div>

      <VueDraggable
        v-model="model.items"
        group="qa-carousel-items"
        :animation="200"
        handle=".drag-handle">
        <div
          v-for="(item, index) in model.items"
          :key="index"
          class="carousel-item-editor q-gutter-y-xs q-mb-sm">
          <q-banner class="bg-grey-2">
            <div class="row items-center q-mb-xs">
              <q-icon
                name="drag_indicator"
                class="drag-handle cursor-pointer q-mr-sm text-grey-5"
                size="20px" />
              <span class="text-caption text-weight-bold">第 {{ Number(index) + 1 }} 张</span>
              <q-space />
              <q-btn
                flat
                round
                dense
                color="negative"
                icon="delete"
                size="sm"
                @click="model.items.splice(index, 1)" />
            </div>
            <q-input v-model="item.src" label="图片地址" dense outlined class="q-mb-xs" />
            <q-input v-model="item.label" label="标签文字" dense outlined />
          </q-banner>
        </div>
      </VueDraggable>

      <q-btn
        flat
        color="primary"
        label="新增图片"
        icon="add"
        no-caps
        class="full-width"
        @click="model.items.push({ src: '', label: '' })" />
    </q-form>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable vue/no-mutating-props */
import { VueDraggable } from 'vue-draggable-plus';

const model = defineModel({
  type: Object,
  default: () => ({})
});
</script>
