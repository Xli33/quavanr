<template>
  <div class="va-container"><slot /></div>
</template>

<style lang="scss">
.va-container {
  width: 100%;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  overflow: visible;

  > .dnd-box-wrapper {
    flex: 1;
    min-height: 120px;
  }
}
</style>
