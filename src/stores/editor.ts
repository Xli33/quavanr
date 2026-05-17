import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export type ComponentNode = ComponentItem | TextNode;

export interface TextNode {
  type: 'text';
  content: string;
}

export interface ComponentItem {
  id: string;
  name: string;
  title: string;
  icon?: string;
  display: 'block' | 'inline';
  props?: Record<string, any>;
  children?: ComponentItem[];
  slots?: Record<string, ComponentNode[] | ComponentNode>;
}

export const useEditorStore = defineStore('editor', () => {
  const componentList = ref<ComponentItem[]>([]);
  const selectedId = ref<string | null>(null);

  function addComponent(component: ComponentItem, index?: number) {
    const newComp = {
      ...component
    };

    if (index !== undefined) {
      componentList.value.splice(index, 0, newComp);
    } else {
      componentList.value.push(newComp);
    }
    return newComp;
  }

  function removeComponent(id: string) {
    const removeRecursive = (list: ComponentItem[]): boolean => {
      const index = list.findIndex(c => c.id === id);
      if (index > -1) {
        list.splice(index, 1);
        return true;
      }
      for (const item of list) {
        if (item.children && removeRecursive(item.children)) return true;
      }
      return false;
    };
    removeRecursive(componentList.value);
  }

  function clear() {
    componentList.value = [];
  }

  const selectedComponent = computed(() => {
    if (!selectedId.value) return null;
    return findComponent(componentList.value, selectedId.value);
  });

  function findComponent(list: ComponentItem[], id: string): ComponentItem | null {
    for (const item of list) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findComponent(item.children, id);
        if (found) return found;
      }
      // Check slots
      if (item.slots) {
        for (const key in item.slots) {
          const slot = item.slots[key];
          if (slot == null) continue;
          const nodes = Array.isArray(slot) ? slot : [slot];
          const found = findComponent(
            nodes.filter((n): n is ComponentItem => 'id' in n),
            id
          );
          if (found) return found;
        }
      }
    }
    return null;
  }

  function updateComponent(id: string, updates: Partial<ComponentItem>) {
    const comp = findComponent(componentList.value, id);
    if (comp) {
      Object.assign(comp, updates);
    }
  }

  return {
    componentList,
    selectedId,
    selectedComponent,
    addComponent,
    removeComponent,
    updateComponent,
    clear
  };
});
