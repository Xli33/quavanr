module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 数组第一个值：0 代表禁用，1 代表警告，2 代表错误
    // 数组第二个值：'always' 代表始终应用
    // 数组第三个值：具体的字数限制（比如提高到 200）
    'header-max-length': [2, 'always', 200]
  }
};
