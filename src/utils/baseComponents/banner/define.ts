export default {
  name: 'q-banner',
  title: '横幅',
  icon: 'text_fields',
  display: 'block',
  slots: {
    avatar: {
      type: 'component',
      name: 'img',
      props: {
        height: '100px',
        src: 'https://cdn.quasar.dev/img/mountains.jpg'
      }
    },
    default: [
      {
        type: 'text',
        content: '横幅'
      },
      {
        type: 'component',
        name: 'q-btn',
        props: {
          label: '按钮2',
          color: 'info'
        }
      }
    ],
    action: {
      type: 'component',
      name: 'q-btn',
      props: {
        label: '按钮'
      }
    }
  }
};
