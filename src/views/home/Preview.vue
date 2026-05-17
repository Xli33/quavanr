<template>
  <!-- Mobile Device Frame -->
  <div class="flex phone-frame shadow-24">
    <div class="phone-top-bar flex flex-center">
      <div class="phone-notch"></div>
    </div>
    <div
      class="phone-screen scroll hide-scrollbar"
      :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-white'">
      <VueDraggable
        v-model="store.componentList"
        class="page-container"
        group="components"
        :animation="300"
        ghost-class="ghost"
        chosen-class="chosen"
        drag-class="drag"
        force-fallback
        :fallback-tolerance="8"
        @change="onRootChange">
        <div
          v-for="element in store.componentList"
          :key="element.id"
          class="dnd-item"
          :class="{
            'is-block': element.display === 'block',
            'is-inline': element.display === 'inline',
            'is-selected': store.selectedId === element.id
          }"
          @click.stop="store.selectedId = element.id">
          <div class="component-wrapper">
            <!-- Action Toolbar -->
            <div class="component-actions flex items-center q-px-xs">
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

            <div class="component-preview q-pa-sm">
              <component :is="resolveComp(element.name)" v-bind="element.props">
                <template v-if="element.children">
                  <DndBox v-model="element.children" />
                </template>
                <template
                  v-for="(slotConfig, slotName) in element.slots"
                  #[slotName]
                  :key="slotName">
                  <SlotRender :element="slotConfig" />
                </template>
              </component>
            </div>
          </div>
        </div>

        <div v-if="store.componentList.length === 0" class="empty-tip flex flex-center text-grey-5">
          <q-icon name="add_circle_outline" size="24px" class="q-mr-xs" />
          <span>拖拽到此处</span>
        </div>
      </VueDraggable>
    </div>
    <div class="phone-bottom-bar flex flex-center">
      <div class="phone-home-indicator"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import { useQuasar } from 'quasar';
import { useEditorStore } from '@/stores/editor';
import { componentMap } from '@/components/Material/components';
import DndBox from '@/components/DndBox/index.vue';
import SlotRender from '@/components/DndBox/slotRender.vue';

const store = useEditorStore();
const $q = useQuasar();

function resolveComp(name: string) {
  return componentMap[name] || name;
}

// SortableJS 事件：仅处理新增组件的自动选中
function onRootChange(evt: any) {
  if (evt.added) {
    store.selectedId = evt.added.element.id;
  }
}
</script>

<style lang="less">
// @import '@/components/DndBox/index.less';

.page-container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  min-height: 100%;
  width: 100%;
  padding: 8px;
  gap: 8px;
  overflow: visible;
}

.phone- {
  &frame {
    width: 407px;
    height: 730px;
    background: #1a1a1a;
    border-radius: 40px;
    padding: 0 12px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    border: 4px solid #333;
  }
  &top-bar {
    height: 30px;
  }
  &notch {
    width: 20px;
    height: 20px;
    background: #000;
    border-radius: 10px;
  }
  &screen {
    flex: 1;
    border-radius: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  &bottom-bar {
    height: 25px;
  }
  &home-indicator {
    width: 100px;
    height: 4px;
    background: #555;
    border-radius: 2px;
  }
}

.hide-scrollbar {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
