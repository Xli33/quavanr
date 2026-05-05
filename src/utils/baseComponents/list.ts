export default {
  name: 'q-list',
  title: '列表',
  icon: 'format_list_bulleted',
  display: 'block',
  props: {
    bordered: true,
    separator: true
  },
  slots: {
    default: {
      type: 'component',
      name: 'q-item',
      props: {},
      slots: {
        default: {
          type: 'component',
          name: 'q-item-section',
          props: {},
          slots: {
            default: {
              type: 'component',
              name: 'q-item-label',
              props: {},
              slots: {
                default: [
                  {
                    type: 'text',
                    content: '列表项'
                  },
                  {
                    type: 'component',
                    name: 'q-btn',
                    props: {
                      style: {
                        marginLeft: '1em'
                      }
                    },
                    slots: {
                      default: {
                        type: 'text',
                        content: '按钮'
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }
  }
};
