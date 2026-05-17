<template>
  <q-layout view="hHh lpR fFf" class="editor-layout">
    <q-header elevated height-hint="64">
      <q-toolbar class="q-px-md">
        <q-btn flat round dense icon="menu" class="q-mr-sm" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-weight-bold row items-center">
          <q-icon name="auto_awesome" size="24px" class="q-mr-sm" />
          Quavanr
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center">
          <q-btn unelevated no-caps dense color="negative" class="q-px-md" @click="clear"
            >清空</q-btn
          >
          <q-btn
            unelevated
            no-caps
            label="预览"
            dense
            class="q-px-md"
            color="primary"
            icon="visibility"
            @click="previewDialogOpen = true" />
          <q-btn unelevated no-caps label="导出" dense class="q-px-md" @click="handleExport" />
          <q-separator vertical inset dark class="q-mx-sm" v-if="$q.dark.isActive" />
          <q-separator vertical inset class="q-mx-sm" v-else />
          <ThemeMenu />
        </div>
      </q-toolbar>
    </q-header>

    <!-- Left Drawer: Component Library -->
    <q-drawer v-model="leftDrawerOpen" side="left" :width="300">
      <Components />
    </q-drawer>

    <!-- Right Drawer: Properties -->
    <q-drawer v-model="rightDrawerOpen" side="right" :width="300">
      <PropsSetting />
    </q-drawer>

    <q-page-container class="full-height">
      <q-page class="flex flex-center full-height">
        <Preview />
      </q-page>
    </q-page-container>

    <ExportDialog v-model="exportDialogOpen" :data="editorStore.componentList" @save="handleSave" />
    <PreviewModal v-model="previewDialogOpen" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar, exportFile } from 'quasar';
import Components from './home/Components.vue';
import Preview from './home/Preview.vue';
import PropsSetting from './home/PropsSetting.vue';
import ExportDialog from './home/ExportDialog.vue';
import PreviewModal from './home/PreviewModal.vue';
import ThemeMenu from '@/components/ThemeMenu.vue';
import { useEditorStore } from '@/stores/editor';

const editorStore = useEditorStore();
const $q = useQuasar();

const leftDrawerOpen = ref(true);
const rightDrawerOpen = ref(true);
const exportDialogOpen = ref(false);
const previewDialogOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function handleExport() {
  if (editorStore.componentList.length === 0) {
    $q.notify({
      type: 'warning',
      message: '当前画布为空，无可导出内容'
    });
    return;
  }
  exportDialogOpen.value = true;
}

function handleSave(data: any) {
  const status = exportFile(
    `quavanr-config-${Date.now()}.json`,
    JSON.stringify(data, null, 2),
    'application/json'
  );

  if (status === true) {
    $q.notify({
      type: 'positive',
      message: '导出成功，正在下载文件...'
    });
  } else {
    $q.notify({
      type: 'negative',
      message: '导出失败: ' + status
    });
  }
}

function clear() {
  $q.dialog({
    title: '清空',
    message: '确定要清空界面内容吗？',
    ok: {
      label: '确定',
      color: 'negative',
      flat: true
    },
    cancel: '取消'
  }).onOk(() => {
    editorStore.clear();
  });
}
</script>

<style lang="less">
.editor-layout {
  height: 100vh;
}
</style>
