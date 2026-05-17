<template>
  <div class="config-va-img">
    <van-form>
      <van-field v-model="model.src" label="图片地址" placeholder="请输入图片URL" />
      <van-field v-model="model.alt" label="替代文本" placeholder="请输入" />
      <van-field v-model="model.width" label="宽度" placeholder="如: 100%" />
      <van-field v-model="model.height" label="高度" placeholder="如: 200px" />
      <van-field v-model="model.radius" label="圆角" placeholder="如: 8px" />

      <van-field name="fit" label="填充方式">
        <template #input>
          <van-radio-group v-model="model.fit" direction="horizontal">
            <van-radio name="cover">覆盖</van-radio>
            <van-radio name="contain">包含</van-radio>
            <van-radio name="fill">拉伸</van-radio>
            <van-radio name="none">原尺寸</van-radio>
            <van-radio name="scale-down">缩小</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="switches" label="选项">
        <template #input>
          <van-switch v-model="model.round" size="20px" active-color="#1989fa" />
          <span class="va-config-label">圆形</span>
          <van-switch v-model="model.lazyLoad" size="20px" active-color="#1989fa" />
          <span class="va-config-label">懒加载</span>
        </template>
      </van-field>
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
