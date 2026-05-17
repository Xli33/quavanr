export default {
  type: 'VaList',
  label: '列 表',
  icon: 'list',
  defaultProps: {
    title: '列表标题',
    count: 3,
    border: true,
    items: [
      { label: '列表项 1', caption: '描述信息 1', icon: 'location-o' },
      { label: '列表项 2', caption: '描述信息 2', icon: 'star-o' },
      { label: '列表项 3', caption: '描述信息 3', icon: 'fire-o' }
    ]
  }
};
