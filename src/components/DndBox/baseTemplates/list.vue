<template>
  <q-item v-for="n in list" :key="n">
    <q-item-section>
      <q-item-label>列表项 {{ n }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineProps({
  list: Array<any>
});
</script>
