<template>
  <div v-if="comp" class="column full-height props-panel">
    <div
      class="q-pa-md flex items-center props-panel__header"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
      <q-icon :name="comp.icon || 'settings'" size="20px" color="primary" class="q-mr-sm" />
      <div class="text-subtitle2 text-weight-bold">{{ comp.title }}</div>
      <q-space />
      <div class="text-caption text-grey-6">{{ comp.id }}</div>
    </div>

    <q-separator />

    <div class="col scroll hide-scrollbar props-panel__body">
      <!-- SFC 模式（config.vue） -->
      <component v-if="sfcComponent" :is="sfcComponent" :model="comp.props" />

      <!-- Schema 模式（config.ts） -->
      <SchemaEditor v-else-if="schema" :schema="schema" :model="comp.props" />

      <div v-else class="q-pa-md text-grey-5 text-center">无可用属性</div>
    </div>
  </div>
  <div v-else class="flex flex-center full-height text-grey-5">
    <div class="text-center">
      <q-icon name="touch_app" size="48px" />
      <div class="q-mt-sm">请选择页面上的组件</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEditorStore } from '@/stores/editor';
import SchemaEditor from '@/components/Material/SchemaEditor.vue';

const store = useEditorStore();
const comp = computed(() => store.selectedComponent);

// ─── SFC 配置（config.vue） ────────────────────────────
const sfcModules = import.meta.glob('@/components/Material/{quasar,vant}/**/config.vue', {
  eager: true,
  import: 'default'
}) as Record<string, any>;

const sfcMap: Record<string, any> = {};
for (const path in sfcModules) {
  const match = path.match(/\/(Qa\w+|Va\w+)\//);
  if (match && match[1]) sfcMap[match[1]] = sfcModules[path];
}

const sfcComponent = computed(() => {
  if (!comp.value) return null;
  return sfcMap[comp.value.name] || null;
});

// ─── Schema 配置（config.ts） ──────────────────────────
const schemaModules = import.meta.glob('@/components/Material/{quasar,vant}/**/config.ts', {
  eager: true,
  import: 'default'
}) as Record<string, any>;

const schemaMap: Record<string, any[]> = {};
for (const path in schemaModules) {
  const match = path.match(/\/(Qa\w+|Va\w+)\//);
  if (match && match[1]) schemaMap[match[1]] = schemaModules[path];
}

const schema = computed(() => {
  if (!comp.value) return null;
  // SFC 优先，有 SFC 配置时不走 Schema
  if (sfcComponent.value) return null;
  return schemaMap[comp.value.name] || null;
});
</script>

<style lang="less" scoped>
.props-panel {
  &__header {
    min-height: 48px;
  }

  &__body {
    padding: 12px;

    :deep(.q-list) {
      padding: 0;
    }

    :deep(.q-item) {
      padding: 8px 0;
    }

    :deep(.q-item__label--caption) {
      font-size: 12px;
      margin-bottom: 2px;
    }
  }
}

.hide-scrollbar {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
