export default {
  name: 'q-btn',
  title: '按钮',
  icon: 'smart_button',
  display: 'inline',
  props: { color: 'primary' },
  slots: {
    default: {
      type: 'text',
      content: '按钮2'
    }
  }
};
