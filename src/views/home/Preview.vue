<template>
  <!-- Mobile Device Frame -->
  <div class="flex phone-frame shadow-24">
    <div class="phone-top-bar flex flex-center">
      <div class="phone-notch"></div>
    </div>
    <div class="phone-screen scroll hide-scrollbar" :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-white'">
      <DndBox v-model="store.componentList" style="min-height: 100%" />
    </div>
    <div class="phone-bottom-bar flex flex-center">
      <div class="phone-home-indicator"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useEditorStore } from '@/stores/editor';

const store = useEditorStore();
const $q = useQuasar();
</script>

<style lang="less">
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
    container-type: size;
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
</style>
