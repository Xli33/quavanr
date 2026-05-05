<template>
  <div
    class="dnd-box-wrapper"
    :class="{ 'is-readonly': readonly }">
    <VueDraggable
      v-model="list"
      class="dnd-box"
      group="components"
      :animation="300"
      :disabled="readonly"
      ghost-class="ghost"
      chosen-class="chosen"
      drag-class="drag">
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
          <!-- Action Toolbar (Visible on Hover/Selected in Editor Mode) -->
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
            <!-- Dynamic Component Rendering -->
            <component :is="element.name" v-bind="element.props">
              <!-- If it has children (recursive container) -->
              <template v-if="element.children">
                <DndBox v-model="element.children" :readonly="readonly" />
              </template>

              <!-- Render Slots -->
              <template v-for="(slotConfig, slotName) in element.slots" #[slotName] :key="slotName">
                <SlotRender :element="slotConfig" />
              </template>
            </component>
          </div>
        </div>
      </div>

      <div v-if="list.length === 0 && !readonly" class="empty-tip flex flex-center text-grey-5">
        <q-icon name="add_circle_outline" size="24px" class="q-mr-xs" />
        <span>拖拽到此处</span>
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
</script>

<style lang="less">
@import 'index.less';
</style>
