<template>
  <div class="config-qa-btn">
    <q-form class="q-gutter-y-sm">
      <q-input v-model="model.label" label="按钮文字" dense outlined />
      <q-select v-model="model.color" :options="colorOptions" label="颜色" dense outlined />
      <q-select v-model="model.size" :options="sizeOptions" label="尺寸" dense outlined />
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <q-checkbox v-model="model.round" label="圆角" dense />
        </div>
        <div class="col-6">
          <q-checkbox v-model="model.outline" label="描边" dense />
        </div>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <q-checkbox v-model="model.flat" label="扁平" dense />
        </div>
        <div class="col-6">
          <q-checkbox v-model="model.dense" label="紧凑" dense />
        </div>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <q-checkbox v-model="model.disable" label="禁用" dense />
        </div>
        <div class="col-6">
          <q-checkbox v-model="model.loading" label="加载中" dense />
        </div>
      </div>
      <q-input v-model="model.icon" label="图标名" dense outlined placeholder="如: check" />
    </q-form>
  </div>
</template>

<script setup lang="ts">
const model = defineModel({
  type: Object,
  default: () => ({})
});

const colorOptions = [
  { label: '主色 primary', value: 'primary' },
  { label: '辅色 secondary', value: 'secondary' },
  { label: '强调色 accent', value: 'accent' },
  { label: '深色 dark', value: 'dark' },
  { label: '正向 positive', value: 'positive' },
  { label: '负面 negative', value: 'negative' },
  { label: '提醒 warning', value: 'warning' },
  { label: '信息 info', value: 'info' }
];

const sizeOptions = [
  { label: '小 xs', value: 'xs' },
  { label: '中 sm', value: 'sm' },
  { label: '默认 md', value: 'md' },
  { label: '大 lg', value: 'lg' },
  { label: '特大 xl', value: 'xl' }
];
</script>
