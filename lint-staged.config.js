import { relative } from 'path';

export default {
  '*.{js,jsx,ts,tsx,vue}': filenames => {
    // 过滤要忽略的路径（例如 public 目录）
    const filesToLint = filenames
      .map(e => relative(process.cwd(), e).replace(/\\/g, '/'))
      .filter(e => !e.startsWith('public/'));

    if (!filesToLint.length) return [];

    const files = filesToLint.join(' ');

    return [
      `oxlint ${files}`,
      `eslint --cache --cache-location node_modules/.cache/eslint/ ${files}`,
      `npm run type-check`
    ];
  },

  '*.{js,jsx,ts,tsx,vue,css,scss,json,md}': ['prettier --check --ignore-unknown --experimental-cli']
};
