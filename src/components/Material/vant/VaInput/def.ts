export default {
  type: 'VaInput',
  label: '输入框',
  icon: 'text_fields',
  defaultProps: {
    label: '标签',
    placeholder: '请输入',
    type: 'text',
    clearable: true,
    readonly: false,
    disabled: false,
    'input-align': 'left',
    autosize: false,
    showWordLimit: false,
    maxlength: ''
  }
};
