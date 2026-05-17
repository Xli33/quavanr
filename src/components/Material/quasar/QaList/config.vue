<template>
  <div class="config-qa-list">
    <q-form class="q-gutter-y-sm">
      <q-input v-model="model.title" label="列表标题" dense outlined />
      <q-input-number v-model="model.count" label="展示条数" :min="1" :max="20" dense outlined />
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <q-checkbox v-model="model.dense" label="紧凑" dense />
        </div>
        <div class="col-6">
          <q-checkbox v-model="model.separator" label="分割线" dense />
        </div>
      </div>

      <q-separator />
      <div class="text-subtitle2">列表项编辑（拖拽排序）</div>

      <VueDraggable
        v-model="model.items"
        group="qa-list-items"
        :animation="200"
        handle=".drag-handle"
        class="qa-list-sortable">
        <div
          v-for="(item, index) in model.items"
          :key="index"
          class="list-item-editor q-gutter-y-xs q-mb-sm">
          <q-banner class="bg-grey-2">
            <div class="row items-center q-mb-xs">
              <q-icon
                name="drag_indicator"
                class="drag-handle cursor-pointer q-mr-sm text-grey-5"
                size="20px" />
              <span class="text-caption text-weight-bold">第 {{ Number(index) + 1 }} 项</span>
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
            <q-input v-model="item.label" label="标题" dense outlined class="q-mb-xs" />
            <q-input v-model="item.caption" label="描述" dense outlined class="q-mb-xs" />
            <q-input v-model="item.icon" label="图标名" dense outlined class="q-mb-xs" />
            <q-input v-model="item.right" label="右侧文字" dense outlined />
          </q-banner>
        </div>
      </VueDraggable>

      <q-btn
        flat
        color="primary"
        label="新增列表项"
        icon="add"
        no-caps
        class="full-width"
        @click="
          model.items.push({
            label: '新列表项',
            caption: '',
            icon: 'check_circle',
            right: ''
          })
        " />
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';

const model = defineModel({
  type: Object,
  default: () => ({})
});
</script>
