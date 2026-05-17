<template>
  <div class="config-va-btn">
    <van-form>
      <van-field v-model="model.text" label="按钮文字" placeholder="请输入" />
      <van-field v-model="model.color" label="自定义颜色" placeholder="如: #07c160" />
      <van-field v-model="model.icon" label="图标名" placeholder="如: plus" />

      <van-field name="type" label="类型">
        <template #input>
          <van-radio-group v-model="model.type" direction="horizontal">
            <van-radio name="primary">主要</van-radio>
            <van-radio name="success">成功</van-radio>
            <van-radio name="warning">警告</van-radio>
            <van-radio name="danger">危险</van-radio>
            <van-radio name="default">默认</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="size" label="尺寸">
        <template #input>
          <van-radio-group v-model="model.size" direction="horizontal">
            <van-radio name="large">大</van-radio>
            <van-radio name="normal">中</van-radio>
            <van-radio name="small">小</van-radio>
            <van-radio name="mini">迷你</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="switches" label="选项">
        <template #input>
          <van-switch v-model="model.block" size="20px" active-color="#1989fa" />
          <span class="va-config-label">块级</span>
          <van-switch v-model="model.round" size="20px" active-color="#1989fa" />
          <span class="va-config-label">圆角</span>
          <van-switch v-model="model.plain" size="20px" active-color="#1989fa" />
          <span class="va-config-label">朴素</span>
          <van-switch v-model="model.hairline" size="20px" active-color="#1989fa" />
          <span class="va-config-label">细边框</span>
          <van-switch v-model="model.disabled" size="20px" active-color="#1989fa" />
          <span class="va-config-label">禁用</span>
          <van-switch v-model="model.loading" size="20px" active-color="#1989fa" />
          <span class="va-config-label">加载中</span>
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
.va-config-label {
  margin: 0 12px 0 4px;
  font-size: 13px;
  color: #666;
}
</style>
