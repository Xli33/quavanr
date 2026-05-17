<template>
  <div class="config-va-list">
    <van-form>
      <van-field v-model="model.title" label="列表标题" placeholder="请输入" />
      <van-field v-model="model.count" label="展示条数" type="digit" placeholder="请输入数量" />

      <van-field name="border" label="边框">
        <template #input>
          <van-switch v-model="model.border" size="20px" active-color="#1989fa" />
        </template>
      </van-field>

      <van-divider>列表项编辑（拖拽排序）</van-divider>

      <VueDraggable
        v-model="model.items"
        group="va-list-items"
        :animation="200"
        handle=".drag-handle">
        <div v-for="(item, index) in model.items" :key="index" class="va-list-item-editor q-mb-sm">
          <van-cell>
            <template #title>
              <div class="va-list-item-header">
                <van-icon name="bars" class="drag-handle cursor-pointer q-mr-sm" color="#999" />
                <span class="text-caption">第 {{ Number(index) + 1 }} 项</span>
                <van-icon name="delete" color="#ee0a24" @click="model.items.splice(index, 1)" />
              </div>
            </template>
          </van-cell>
          <van-field v-model="item.label" label="标题" placeholder="请输入" />
          <van-field v-model="item.caption" label="描述" placeholder="请输入" />
          <van-field v-model="item.icon" label="图标名" placeholder="如: location-o" />
          <van-field v-model="item.right" label="右侧文字" placeholder="请输入" />
        </div>
      </VueDraggable>

      <van-button
        block
        type="primary"
        plain
        icon="plus"
        size="small"
        @click="
          model.items.push({
            label: '新列表项',
            caption: '',
            icon: '',
            right: ''
          })
        ">
        新增列表项
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
.va-list-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  color: #666;
}
</style>
