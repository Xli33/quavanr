<template>
  <div class="config-va-carousel">
    <van-form>
      <van-field v-model="model.height" label="高度(px)" type="digit" placeholder="如: 200" />
      <van-field v-model="model.interval" label="间隔(ms)" type="digit" placeholder="如: 3000" />
      <van-field v-model="model.duration" label="动画时长(ms)" type="digit" placeholder="如: 500" />

      <van-field name="switches1" label="选项">
        <template #input>
          <van-switch v-model="model.autoplay" size="20px" active-color="#1989fa" />
          <span class="va-config-label">自动播放</span>
          <van-switch v-model="model.indicator" size="20px" active-color="#1989fa" />
          <span class="va-config-label">指示器</span>
          <van-switch v-model="model.vertical" size="20px" active-color="#1989fa" />
          <span class="va-config-label">纵向</span>
          <van-switch v-model="model.touchable" size="20px" active-color="#1989fa" />
          <span class="va-config-label">可拖动</span>
        </template>
      </van-field>

      <van-divider>轮播图片编辑（拖拽排序）</van-divider>

      <VueDraggable
        v-model="model.items"
        group="va-carousel-items"
        :animation="200"
        handle=".drag-handle">
        <div
          v-for="(item, index) in model.items"
          :key="index"
          class="va-carousel-item-editor q-mb-sm">
          <van-cell>
            <template #title>
              <div class="va-list-item-header">
                <van-icon name="bars" class="drag-handle cursor-pointer q-mr-sm" color="#999" />
                <span class="text-caption">第 {{ Number(index) + 1 }} 张</span>
                <van-icon name="delete" color="#ee0a24" @click="model.items.splice(index, 1)" />
              </div>
            </template>
          </van-cell>
          <van-field v-model="item.src" label="图片地址" placeholder="请输入图片URL" />
          <van-field v-model="item.label" label="标签文字" placeholder="可选" />
        </div>
      </VueDraggable>

      <van-button
        block
        type="primary"
        plain
        icon="plus"
        size="small"
        @click="model.items.push({ src: '', label: '' })">
        新增图片
      </van-button>
    </van-form>
  </div>
</template>

<script setup lang="ts">
const model = defineModel({
  type: Object,
  default: () => ({})
});
</script>

<style lang="scss">
@import './style.scss';
</style>
