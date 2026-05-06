<template>
  <q-btn flat round dense icon="settings_brightness">
    <q-menu auto-close>
      <q-list>
        <q-item
          clickable
          :active="UserData.theme === 'auto'"
          class="items-center"
          @click="changeTheme('auto')">
          <q-icon name="brightness_medium" class="q-mr-xs"></q-icon>
          <span class="vertical-middle">自动</span>
        </q-item>
        <q-item
          clickable
          :active="UserData.theme === 'light'"
          class="items-center"
          @click="changeTheme('light')">
          <q-icon name="light_mode" class="q-mr-xs"></q-icon>
          <span class="vertical-middle">日间</span>
        </q-item>
        <q-item
          clickable
          :active="UserData.theme === 'dark'"
          class="items-center"
          @click="changeTheme('dark')">
          <q-icon name="dark_mode" class="q-mr-xs"></q-icon>
          <span class="vertical-middle">夜间</span>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Dark } from 'quasar';
import { useUserStore } from '@/store';

const { UserData, changeSetting } = useUserStore();

const changeTheme = (type: typeof UserData.theme) => {
  const matchDark = (Dark as Obj).__media ?? window.matchMedia('(prefers-color-scheme:dark)');
  const isAuto = type === 'auto',
    canChange =
      (Dark.isActive && (type === 'light' || (isAuto && !matchDark.matches))) ||
      (!Dark.isActive && (type === 'dark' || (isAuto && matchDark.matches)));

  if (canChange) {
    const target = type === 'auto' ? type : type === 'dark';
    changeSetting('theme', type);
    document.startViewTransition
      ? document.startViewTransition(() => {
          Dark.set(target);
        })
      : Dark.set(target);
  }
};

onMounted(() => {
  changeTheme(UserData.theme);
});
</script>

<style scoped>
.vertical-middle {
  vertical-align: middle;
}
</style>
