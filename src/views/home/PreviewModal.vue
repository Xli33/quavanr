<template>
  <q-dialog v-model="model" transition-show="scale" transition-hide="scale">
    <div class="preview-modal-content flex flex-center no-shadow" style="background: transparent">
      <!-- Mobile Device Frame -->
      <div class="flex phone-frame shadow-24">
        <div class="phone-top-bar flex flex-center">
          <div class="phone-notch"></div>
        </div>
        <div class="phone-screen scroll hide-scrollbar" :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-white'">
          <!-- Final rendering in readonly mode -->
          <DndBox v-model="store.componentList" readonly style="min-height: 100%" />
        </div>
        <div class="phone-bottom-bar flex flex-center">
          <div class="phone-home-indicator"></div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { useEditorStore } from '@/stores/editor';
import DndBox from '@/components/DndBox/index.vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const store = useEditorStore();
const $q = useQuasar();

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});
</script>

<style lang="less" scoped>
.preview-modal-content {
  overflow: visible;
}

.phone- {
  &frame {
    width: 375px; // Standard iPhone width for final preview
    height: 750px;
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
    width: 120px;
    height: 20px;
    background: #000;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  &screen {
    flex: 1;
    border-radius: 5px;
    position: relative;
    overflow: auto;
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
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
}
</style>
