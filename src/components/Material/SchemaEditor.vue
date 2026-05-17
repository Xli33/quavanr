<template>
  <q-list padding class="schema-editor">
    <template v-for="(item, key) in schema" :key="key">
      <!-- Divider -->
      <q-separator v-if="item.type === 'divider'" spaced class="q-my-sm" />
      <div
        v-if="item.type === 'divider'"
        class="text-weight-bold text-grey-8 q-mb-xs"
        style="font-size: 13px">
        {{ item.label }}
      </div>

      <!-- Input -->
      <q-item v-else-if="item.type === 'input'" dense>
        <q-item-section>
          <q-item-label caption class="q-mb-xs">{{ item.label }}</q-item-label>
          <q-input
            :model-value="getValue(item.key || key)"
            @update:model-value="(val: any) => setValue(item.key || key, val)"
            dense
            outlined
            :placeholder="item.placeholder || ''" />
        </q-item-section>
      </q-item>

      <!-- Number -->
      <q-item v-else-if="item.type === 'number'" dense>
        <q-item-section>
          <q-item-label caption class="q-mb-xs">{{ item.label }}</q-item-label>
          <q-input
            :model-value="getValue(item.key || key)"
            @update:model-value="(val: any) => setValue(item.key || key, Number(val))"
            type="number"
            dense
            outlined
            :min="item.min"
            :max="item.max" />
        </q-item-section>
      </q-item>

      <!-- Switch -->
      <q-item v-else-if="item.type === 'switch'" dense tag="label">
        <q-item-section>
          <q-item-label caption>{{ item.label }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle
            :model-value="getValue(item.key || key)"
            @update:model-value="(val: boolean) => setValue(item.key || key, val)"
            dense />
        </q-item-section>
      </q-item>

      <!-- Color -->
      <q-item v-else-if="item.type === 'color'" dense>
        <q-item-section>
          <q-item-label caption class="q-mb-xs">{{ item.label }}</q-item-label>
          <q-input
            :model-value="getValue(item.key || key)"
            @update:model-value="(val: any) => setValue(item.key || key, val)"
            dense
            outlined>
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-color
                    :model-value="getValue(item.key || key)"
                    @update:model-value="(val: any) => setValue(item.key || key, val)" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item-section>
      </q-item>

      <!-- Select -->
      <q-item v-else-if="item.type === 'select'" dense>
        <q-item-section>
          <q-item-label caption class="q-mb-xs">{{ item.label }}</q-item-label>
          <q-select
            :model-value="getValue(item.key || key)"
            @update:model-value="(val: any) => setValue(item.key || key, val)"
            :options="item.options || []"
            dense
            outlined
            emit-value
            map-options />
        </q-item-section>
      </q-item>

      <!-- Checkbox -->
      <q-item v-else-if="item.type === 'checkbox'" dense tag="label">
        <q-item-section>
          <q-item-label caption>{{ item.text || item.label }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-checkbox
            :model-value="getValue(item.key || key)"
            @update:model-value="(val: boolean) => setValue(item.key || key, val)"
            dense />
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script setup lang="ts">
// JSON Schema 驱动的通用属性编辑器（Quasar 版）

const props = defineProps({
  schema: {
    type: Array as unknown as () => any[],
    default: () => []
  },
  model: {
    type: Object,
    default: () => ({})
  }
});

const getValue = (keyPath: string) => {
  const keys = keyPath.split('.');
  let obj: any = props.model;
  for (const k of keys) {
    if (obj != null && k in obj) {
      obj = obj[k as keyof typeof obj];
    } else {
      return undefined;
    }
  }
  return obj;
};

const setValue = (keyPath: string, value: any) => {
  const keys = keyPath.split('.');
  let obj: any = props.model;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]!;
    if (!(k in obj)) {
      obj[k] = {};
    }
    obj = obj[k];
  }
  const lastKey = keys[keys.length - 1]!;
  obj[lastKey] = value;
};
</script>
