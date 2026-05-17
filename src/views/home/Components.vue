<template>
  <div class="column full-height">
    <q-tabs
      v-model="activeTab"
      dense
      class="text-grey-7"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator>
      <q-tab name="base" label="quasar" />
      <q-tab name="other" label="vant" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="activeTab" animated class="col">
      <q-tab-panel name="base" class="q-pa-md">
        <VueDraggable
          :model-value="quasarComponents"
          class="row q-col-gutter-sm"
          :group="{ name: 'components', pull: 'clone', put: false }"
          :sort="false"
          :clone="handleClone"
          item-key="name">
          <div v-for="comp in quasarComponents" :key="comp.name" class="col-6">
            <q-btn
              outline
              color="grey-4"
              text-color="grey-9"
              class="full-width component-btn q-py-md"
              stack
              no-caps
              @click="handleAddComponent(comp)">
              <q-icon :name="comp.icon" size="24px" color="primary" />
              <div class="text-caption text-weight-medium q-mt-xs">{{ comp.title }}</div>
            </q-btn>
          </div>
        </VueDraggable>
      </q-tab-panel>
      <q-tab-panel name="other">
        <VueDraggable
          :model-value="vantComponents"
          class="row q-col-gutter-sm"
          :group="{ name: 'components', pull: 'clone', put: false }"
          :sort="false"
          :clone="handleClone"
          item-key="name">
          <div v-for="comp in vantComponents" :key="comp.name" class="col-6">
            <q-btn
              outline
              color="grey-4"
              text-color="grey-9"
              class="full-width component-btn q-py-md"
              stack
              no-caps
              @click="handleAddComponent(comp)">
              <q-icon :name="comp.icon" size="24px" color="primary" />
              <div class="text-caption text-weight-medium q-mt-xs">{{ comp.title }}</div>
            </q-btn>
          </div>
        </VueDraggable>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { useEditorStore, type ComponentItem } from '@/stores/editor';
import { quasarComponents, vantComponents } from '@/components/Material/components';

const activeTab = ref('base');
const store = useEditorStore();

const initComponent = (item: any): ComponentItem => {
  // Deep clone to avoid shared references between instances
  const newItem = JSON.parse(JSON.stringify(item));

  return {
    ...newItem,
    id: Math.random().toString(36).substring(2, 9),
    props: newItem.props || {},
    slots: newItem.slots || {},
    children: newItem.children || undefined
  };
};

const handleClone = (item: any): ComponentItem => {
  return initComponent(item);
};

const handleAddComponent = (item: any) => {
  const comp = store.addComponent(initComponent(item));
  if (comp) store.selectedId = comp.id;
};
</script>

<style lang="less">
.component-btn {
  border-radius: 8px;
  background: #fdfdfd;
  transition:
    background 0.2s,
    border-color 0.2s;
  &:hover {
    background: #f0f7ff;
    border-color: var(--q-primary);
  }
}
</style>
