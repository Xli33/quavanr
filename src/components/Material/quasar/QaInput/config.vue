<template>
  <div class="config-qa-input">
    <q-form class="q-gutter-y-sm">
      <q-input v-model="model.label" label="标签文字" dense outlined />
      <q-input v-model="model.placeholder" label="占位文本" dense outlined />
      <q-select v-model="model.type" :options="typeOptions" label="输入类型" dense outlined />
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <q-checkbox v-model="model.outlined" label="描边" dense />
        </div>
        <div class="col-6">
          <q-checkbox v-model="model.dense" label="紧凑" dense />
        </div>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <q-checkbox v-model="model.clearable" label="可清除" dense />
        </div>
        <div class="col-6">
          <q-checkbox v-model="model.readonly" label="只读" dense />
        </div>
      </div>
      <q-checkbox v-model="model.disable" label="禁用" dense />
      <q-input v-model="model.prefix" label="前置图标" dense outlined />
      <q-input v-model="model.suffix" label="后置图标" dense outlined />
    </q-form>
  </div>
</template>

<script setup lang="ts">
const model = defineModel({
  type: Object,
  default: () => ({})
});

const typeOptions = [
  { label: '文本 text', value: 'text' },
  { label: '密码 password', value: 'password' },
  { label: '数字 number', value: 'number' },
  { label: '邮箱 email', value: 'email' },
  { label: '电话 tel', value: 'tel' },
  { label: '搜索 search', value: 'search' },
  { label: '文本域 textarea', value: 'textarea' }
];
</script>
