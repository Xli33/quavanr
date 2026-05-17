export default {
  type: 'QaList',
  label: '列 表',
  icon: 'list',
  defaultProps: {
    title: '列表标题',
    count: 3,
    dense: false,
    separator: true,
    items: [
      { label: '列表项 1', caption: '描述信息 1', icon: 'star' },
      { label: '列表项 2', caption: '描述信息 2', icon: 'favorite' },
      { label: '列表项 3', caption: '描述信息 3', icon: 'info' }
    ]
  }
};
