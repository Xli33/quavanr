<template>
  <div class="config-va-input">
    <van-form>
      <van-field v-model="model.label" label="标签文字" placeholder="请输入" />
      <van-field v-model="model.placeholder" label="占位文本" placeholder="请输入" />
      <van-field v-model="model.maxlength" label="最大长度" placeholder="不限制留空" type="digit" />

      <van-field name="type" label="输入类型">
        <template #input>
          <van-radio-group v-model="model.type" direction="horizontal">
            <van-radio name="text">文本</van-radio>
            <van-radio name="password">密码</van-radio>
            <van-radio name="number">数字</van-radio>
            <van-radio name="digit">整数</van-radio>
            <van-radio name="textarea">多行</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="input-align" label="对齐方式">
        <template #input>
          <van-radio-group v-model="model['input-align']" direction="horizontal">
            <van-radio name="left">左</van-radio>
            <van-radio name="center">中</van-radio>
            <van-radio name="right">右</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="switches" label="选项">
        <template #input>
          <van-switch v-model="model.clearable" size="20px" active-color="#1989fa" />
          <span class="va-config-label">可清除</span>
          <van-switch v-model="model.readonly" size="20px" active-color="#1989fa" />
          <span class="va-config-label">只读</span>
          <van-switch v-model="model.disabled" size="20px" active-color="#1989fa" />
          <span class="va-config-label">禁用</span>
          <van-switch v-model="model.autosize" size="20px" active-color="#1989fa" />
          <span class="va-config-label">自适应高</span>
          <van-switch v-model="model.showWordLimit" size="20px" active-color="#1989fa" />
          <span class="va-config-label">字数统计</span>
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
