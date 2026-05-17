<template>
  <div class="dnd-box-wrapper">
    <VueDraggable
      v-model="list"
      class="dnd-box dnd-box--nested"
      group="components"
      :animation="150"
      :disabled="readonly"
      ghost-class="ghost"
      chosen-class="chosen"
      drag-class="drag"
      force-fallback
      :fallback-tolerance="8"
      @change="onChange">
      <div
        v-for="element in list"
        :key="element.id"
        class="dnd-item"
        :class="{
          'is-block': element.display === 'block',
          'is-inline': element.display === 'inline',
          'is-selected': !readonly && store.selectedId === element.id,
          'no-toolbar': readonly
        }"
        @click.stop="!readonly && (store.selectedId = element.id)">
        <div class="component-wrapper">
          <div v-if="!readonly" class="component-actions flex items-center q-px-xs">
            <span class="text-caption text-white q-ml-xs">{{ element.title }}</span>
            <q-space />
            <q-btn
              flat
              round
              dense
              icon="close"
              size="xs"
              color="white"
              @click.stop="store.removeComponent(element.id)" />
          </div>
          <div class="component-preview" :class="{ 'q-pa-sm': !readonly }">
            <component :is="resolveComp(element.name)" v-bind="element.props">
              <template v-if="element.children">
                <DndBox v-model="element.children" :readonly="readonly" />
              </template>
              <template v-for="(slotConfig, slotName) in element.slots" #[slotName] :key="slotName">
                <SlotRender :element="slotConfig" />
              </template>
            </component>
          </div>
        </div>
      </div>

      <div v-if="list.length === 0 && !readonly" class="empty-tip flex flex-center text-grey-5">
        <q-icon name="add_circle_outline" size="24px" class="q-mr-xs" />
        <span>拖拽组件到此处</span>
      </div>
    </VueDraggable>
  </div>
</template>

<script lang="ts">
// 通用容器
export default {
  name: 'DndBox'
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { useEditorStore, type ComponentItem } from '@/stores/editor';
import { componentMap } from '@/components/Material/components';
import SlotRender from './slotRender.vue';

const props = defineProps<{
  modelValue: ComponentItem[];
  readonly?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const store = useEditorStore();

const list = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
});

function resolveComp(name: string) {
  return componentMap[name] || name;
}

function onChange(evt: any) {
  if (evt.added) {
    store.selectedId = evt.added.element.id;
  }
}
</script>

<style lang="less">
@import 'index.less';
</style>
