<template>
  <q-dialog v-model="model" persistent maximized transition-show="slide-up" transition-hide="slide-down">
    <q-card class="bg-grey-1 column full-height">
      <q-bar class="bg-primary text-white">
        <q-icon name="code" />
        <div>导出配置 (JSON)</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>关闭</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="col scroll q-pa-none bg-black overflow-hidden">
        <pre class="json-preview q-pa-md text-green-13">{{ formattedJson }}</pre>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="bg-white q-pa-md">
        <q-btn flat label="复制到剪贴板" color="primary" @click="copyToClipboard" icon="content_copy" />
        <q-space />
        <q-btn flat label="取消" color="grey-7" v-close-popup />
        <q-btn unelevated label="确认保存" color="primary" @click="handleSave" icon="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar, copyToClipboard as qCopy } from 'quasar';

const props = defineProps<{
  modelValue: boolean;
  data: any;
}>();

const emit = defineEmits(['update:modelValue', 'save']);

const $q = useQuasar();

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const formattedJson = computed(() => {
  return JSON.stringify(props.data, null, 2);
});

async function copyToClipboard() {
  try {
    await qCopy(formattedJson.value);
    $q.notify({
      type: 'positive',
      message: '已复制到剪贴板',
      timeout: 1000
    });
  } catch (err) {
    $q.notify({
      type: 'negative',
      message: '复制失败'
    });
  }
}

function handleSave() {
  emit('save', props.data);
  model.value = false;
}
</script>

<style lang="less" scoped>
.json-preview {
  margin: 0;
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
