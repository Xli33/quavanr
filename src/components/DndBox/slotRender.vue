<script lang="tsx">
import { resolveComponent, h, type VNode } from 'vue';
import type { ComponentNode } from '@/stores/editor';
import { componentMap } from '@/components/Material/components';

export default {
  name: 'SlotRender',
  props: {
    element: {
      type: [Object, Array],
      required: true
    }
  },
  setup(props) {
    const resolveComp = (name: string) => componentMap[name] || resolveComponent(name);

    const renderNode = (node: ComponentNode): VNode | string | null => {
      if (!node) return null;

      // Handle Text Node
      if ('type' in node && node.type === 'text') {
        return node.content;
      }

      // Handle Component Item
      const comp = node as any;
      const componentName = comp.name;
      const componentProps = comp.props || {};
      const componentSlots = comp.slots || {};

      // Prepare slots for the component
      const slots: Record<string, any> = {};

      for (const name in componentSlots) {
        const slotContent = componentSlots[name];
        slots[name] = () => renderNodes(slotContent);
      }

      try {
        const resolved = resolveComp(componentName);
        // If it's a string (like 'div', 'img'), resolveComponent returns the string itself
        // If it's a registered component, it returns the component object
        return h(resolved as any, componentProps, slots);
      } catch (e) {
        console.warn(`Failed to resolve component: ${componentName}`, e);
        return h('div', { class: 'text-negative' }, `Component not found: ${componentName}`);
      }
    };

    const renderNodes = (nodes: ComponentNode[] | ComponentNode | undefined): any => {
      if (!nodes) return null;
      if (Array.isArray(nodes)) {
        return nodes.map(node => renderNode(node));
      }
      return renderNode(nodes);
    };

    return () => renderNodes(props.element as any);
  }
};
</script>
