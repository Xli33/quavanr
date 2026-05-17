import type { ComponentItem } from '@/stores/editor';

// Import all definitions
const defineList = import.meta.glob<ComponentItem>('./*/define.ts', {
  eager: true,
  import: 'default'
});

// Import all settings
const settingList = import.meta.glob<any[]>('./*/setting.ts', {
  eager: true,
  import: 'default'
});

export const vantComponents = Object.values(defineList);

// Export a map for easy lookup of settings by component name
export const vantSettings: Record<string, any[]> = {};
for (const path in settingList) {
  const componentName = path.split('/')[1];
  // Map it to the name defined in the component item (e.g. van-button)
  const def = defineList[`./${componentName}/define.ts`];
  if (def && settingList[path]) {
    vantSettings[def.name] = settingList[path];
  }
}
