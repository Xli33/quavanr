<template>
  <div class="qa-container"><slot /></div>
</template>

<style lang="scss">
.qa-container {
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
