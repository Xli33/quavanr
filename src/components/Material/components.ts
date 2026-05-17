import type { Component } from 'vue';
import type { ComponentItem } from '@/stores/editor';

interface ComponentDef {
  type: string;
  label: string;
  icon: string;
  defaultProps: Record<string, any>;
}

const getComponentName = (path: string) => path.match(/\/(Qa\w+|Va\w+)\//)![1]!;

// ─── 组件实例映射（用于动态渲染） ──────────────────────────
// 类似 apollo-decorate 的 componentMap：type -> index.vue 组件

const quasarCompModules = import.meta.glob<Component>('./quasar/Qa*/index.vue', {
  eager: true,
  import: 'default'
});

const vantCompModules = import.meta.glob<Component>('./vant/Va*/index.vue', {
  eager: true,
  import: 'default'
});

export const componentMap: Record<string, Component> = {};

for (const path in quasarCompModules) {
  const name = getComponentName(path);
  const comp = quasarCompModules[path];
  if (comp) componentMap[name] = comp;
}

for (const path in vantCompModules) {
  const name = getComponentName(path);
  const comp = vantCompModules[path];
  if (comp) componentMap[name] = comp;
}

// ─── 组件定义（def.ts） ───────────────────────────────────

const quasarDefModules = import.meta.glob<ComponentDef>('./quasar/Qa*/def.ts', {
  eager: true,
  import: 'default'
});

const vantDefModules = import.meta.glob<ComponentDef>('./vant/Va*/def.ts', {
  eager: true,
  import: 'default'
});

// 将 Mini* 风格的 def 转换为 ComponentItem 格式
function toComponentItem(def: ComponentDef): ComponentItem {
  const isContainer = def.type.endsWith('Container');
  return {
    id: '',
    name: def.type,
    title: def.label,
    icon: def.icon,
    display: isContainer ? 'block' : def.type.includes('Button') ? 'inline' : 'block',
    props: def.defaultProps || {},
    slots: {},
    children: isContainer ? [] : undefined
  };
}

// Quasar 组件列表（供左侧面板使用）
export const quasarComponents: ComponentItem[] = [];
for (const path in quasarDefModules) {
  const def = quasarDefModules[path];
  if (def) quasarComponents.push(toComponentItem(def));
}

// Vant 组件列表（供左侧面板使用）
export const vantComponents: ComponentItem[] = [];
for (const path in vantDefModules) {
  const def = vantDefModules[path];
  if (def) vantComponents.push(toComponentItem(def));
}
