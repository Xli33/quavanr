<template>
  <div class="config-qa-img">
    <q-form class="q-gutter-y-sm">
      <q-input v-model="model.src" label="图片地址" dense outlined type="url" />
      <q-input v-model="model.alt" label="替代文本" dense outlined />
      <q-input v-model="model.width" label="宽度" dense outlined />
      <q-input v-model="model.height" label="高度" dense outlined />
      <q-input v-model="model.radius" label="圆角" dense outlined placeholder="如: 8px" />
      <q-select v-model="model.fit" :options="fitOptions" label="填充方式" dense outlined />
    </q-form>
  </div>
</template>

<script setup lang="ts">
const model = defineModel({
  type: Object,
  default: () => ({})
});

const fitOptions = [
  { label: '覆盖 cover', value: 'cover' },
  { label: '包含 contain', value: 'contain' },
  { label: '拉伸 fill', value: 'fill' },
  { label: '缩小 none', value: 'none' },
  { label: '缩小或包含 scale-down', value: 'scale-down' }
];
</script>
