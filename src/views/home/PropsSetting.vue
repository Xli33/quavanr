<template>
  <div v-if="comp" class="column full-height">
    <div class="q-pa-md bg-grey-2 flex items-center">
      <q-icon :name="comp.icon || 'settings'" size="20px" color="primary" class="q-mr-sm" />
      <div class="text-subtitle2 text-weight-bold">{{ comp.title }}</div>
      <q-space />
      <div class="text-caption text-grey-6">{{ comp.id }}</div>
    </div>

    <q-tabs
      v-model="activeTab"
      dense
      class="text-grey-7"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator>
      <q-tab name="props" label="属性" />
      <q-tab name="style" label="样式" />
      <q-tab v-if="hasSlots" name="slots" label="插槽" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="activeTab" animated class="col scroll hide-scrollbar">
      <!-- Props Panel -->
      <q-tab-panel name="props" class="q-pa-none">
        <q-list padding>
          <template v-if="currentPropsSchema.length">
            <q-item v-for="prop in currentPropsSchema" :key="prop.key">
              <q-item-section>
                <q-item-label caption>{{ prop.label }}</q-item-label>
                
                <q-input
                  v-if="prop.type === 'text'"
                  v-model="comp.props[prop.key]"
                  dense
                  filled />
                
                <q-toggle
                  v-else-if="prop.type === 'boolean'"
                  v-model="comp.props[prop.key]" />
                
                <q-select
                  v-else-if="prop.type === 'select'"
                  v-model="comp.props[prop.key]"
                  :options="prop.options"
                  dense
                  filled />

                <q-input
                  v-else-if="prop.type === 'color'"
                  v-model="comp.props[prop.key]"
                  dense
                  filled>
                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-color v-model="comp.props[prop.key]" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </q-item-section>
            </q-item>
          </template>
          <div v-else class="q-pa-md text-grey-5 text-center">无可用属性</div>
        </q-list>
      </q-tab-panel>

      <!-- Style Panel -->
      <q-tab-panel name="style" class="q-pa-sm">
        <q-list padding>
          <q-item-label header>间距 (Margin/Padding)</q-item-label>
          <q-item>
            <q-item-section>
              <q-item-label caption>外边距 (Margin)</q-item-label>
              <q-input v-model="compStyle.margin" dense filled placeholder="0px" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>内边距 (Padding)</q-item-label>
              <q-input v-model="compStyle.padding" dense filled placeholder="0px" />
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />
          
          <q-item-label header>外观</q-item-label>
          <q-item>
            <q-item-section>
              <q-item-label caption>背景颜色</q-item-label>
              <q-input v-model="compStyle.backgroundColor" dense filled>
                <template v-slot:append>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-color v-model="compStyle.backgroundColor" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>文字颜色</q-item-label>
              <q-input v-model="compStyle.color" dense filled>
                <template v-slot:append>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-color v-model="compStyle.color" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>

      <!-- Slots Panel -->
      <q-tab-panel name="slots" class="q-pa-none">
        <q-list padding>
          <q-item v-for="(val, slotName) in comp.slots" :key="slotName">
            <q-item-section>
              <q-item-label class="text-weight-bold" color="primary">{{ slotName }} 插槽</q-item-label>
              
              <!-- Recursive Slot Item Editor -->
              <div class="q-mt-sm">
                <template v-if="Array.isArray(val)">
                  <div v-for="(item, idx) in val" :key="idx" class="q-mb-sm bg-grey-1 q-pa-sm rounded-borders">
                    <div class="row items-center q-mb-xs">
                      <q-badge :color="'name' in item ? 'primary' : 'secondary'">
                        {{ 'name' in item ? '组件: ' + (item.title || item.name) : '文本' }}
                      </q-badge>
                    </div>
                    
                    <q-input
                      v-if="'type' in item && item.type === 'text'"
                      v-model="item.content"
                      dense
                      filled
                      autogrow
                      label="文本内容" />
                    
                    <div v-else class="text-caption text-grey-6">
                      属性可在点击该组件后在左侧/右侧面板编辑
                    </div>
                  </div>
                </template>
                
                <template v-else>
                  <div class="bg-grey-1 q-pa-sm rounded-borders">
                    <div class="row items-center q-mb-xs">
                      <q-badge :color="'name' in val ? 'primary' : 'secondary'">
                        {{ 'name' in val ? '组件: ' + (val.title || val.name) : '文本' }}
                      </q-badge>
                    </div>

                    <q-input
                      v-if="'type' in val && val.type === 'text'"
                      v-model="val.content"
                      dense
                      filled
                      autogrow
                      label="文本内容" />

                    <div v-else class="text-caption text-grey-6">
                      属性可在点击该组件后在左侧/右侧面板编辑
                    </div>
                  </div>
                </template>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </div>
  <div v-else class="flex flex-center full-height text-grey-5">
    <div class="text-center">
      <q-icon name="touch_app" size="48px" />
      <div class="q-mt-sm">请选择页面上的组件</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEditorStore } from '@/stores/editor';
import { baseSettings } from '@/utils/baseComponents';
import { vantSettings } from '@/utils/vantComponents';

const store = useEditorStore();
const activeTab = ref('props');

const comp = computed(() => store.selectedComponent);

const hasSlots = computed(() => {
  return comp.value && comp.value.slots && Object.keys(comp.value.slots).length > 0;
});

// 模拟样式代理
const compStyle = computed({
  get: () => {
    if (!comp.value) return {};
    if (!comp.value.props) comp.value.props = {};
    if (!comp.value.props.style) comp.value.props.style = {};
    return comp.value.props.style;
  },
  set: (val) => {
    if (comp.value) {
      if (!comp.value.props) comp.value.props = {};
      comp.value.props.style = val;
    }
  }
});

const currentPropsSchema = computed(() => {
  if (!comp.value) return [];
  // Merge or pick from relevant settings
  const name = comp.value.name;
  return baseSettings[name] || vantSettings[name] || [];
});
</script>

<style lang="less" scoped>
.hide-scrollbar {
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
}
</style>
