import { fileURLToPath, URL } from 'node:url';

import { defineConfig, type PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import externals from '@yellowspot/vite-plugin-externals';
import html from 'vite-plugin-htmlx';
import checker from 'vite-plugin-checker';
import { analyzer } from 'vite-bundle-analyzer';
import { compression } from 'vite-plugin-compression2';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve',
    isBuild = command === 'build',
    plugins: PluginOption[] = [
      checker({
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint .'
          // lintCommand: 'eslint "./src/**/*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}"'
        }
      }),
      // 可以从全局作用域访问的外部依赖
      externals({
        vue: 'Vue',
        'vue-router': 'VueRouter',
        quasar: 'Quasar',
        vant: 'vant'
      }),
      html({
        minify: isBuild && {
          removeComments: true, // 删除注释
          collapseWhitespace: true, // 压缩空白符
          minifyJS: true,
          minifyCSS: true,
          keepClosingSlash: false,
          processScripts: ['importmap']
        },
        page: {
          /**
           * 入口，一般不用改，使用默认的src/main.ts即可
           */
          // entry: 'src/main.ts',
          /**
           * 一般不用改，使用默认的index.html即可
           * @default index.html
           */
          // template: 'index.html',
          /**
           * Data to inject into the EJS template
           */
          inject: {
            data: {
              packedTime: isBuild ? Date.now() : ''
            }
          }
        }
      })
    ];

  // 压缩
  if (isBuild) {
    plugins.push(
      compression({
        exclude: /[\\/]dist[\\/](?!css|js)/, // 只压缩dist/css和dist/js文件
        algorithms: ['gzip' /* 'brotliCompress' defineAlgorithm('deflate', { level: 9 }) */],
        threshold: 10240 // 超过10kB才压缩
      })
    );
  }
  // 分析打包资源
  if (mode === 'analyze') {
    console.log('开启打包体积分析...');
    plugins.push(analyzer());
  }

  return {
    plugins: [vue(), vueJsx(), vueDevTools(), ...plugins],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/styles/common.less";`
        }
      }
    },
    build: {
      modulePreload: false,
      sourcemap: isDev ? 'inline' : false,
      rolldownOptions: {
        // 从原生esm访问的外部依赖，通过importmap设置了对应映射
        external: [
          // 依赖的avue-plugin-ueditor中的packages\ueditor\src\index.vue引入了@wangeditor/editor/dist/css/style.css
          // 而该样式已通过link全局引入，故将其也配置为外部依赖，避免该样式会被打包进vendor.css产生重复冗余
          // '@wangeditor/editor/dist/css/style.css'
        ],
        output: {
          minify: {
            compress: {
              dropConsole: false,
              dropDebugger: true
            }
            // module: true,
            // codegen: true
          },
          chunkFileNames: chunkInfo => {
            // console.log(chunkInfo)
            // 将语言文件打包到 locale 目录
            if (chunkInfo.name.includes('locale/')) return '[name]-[hash].js';
            // if (chunkInfo.name === 'zh-CN') return 'locale/zh-CN-[hash].js';
            // if (
            //   chunkInfo.isDynamicEntry &&
            //   chunkInfo.facadeModuleId?.includes('/src/assets/locale')
            // ) {
            //   const locale = chunkInfo.facadeModuleId.match(/([a-zA-Z-]+)\/index.ts/)!;
            //   return `locale/${locale[1]}-[hash].js`;
            // }
            return 'js/[name]-[hash].js';
          },
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: assetInfo => {
            if (/iconfont.*\.svg|\.(ttf|otf|woff|woff2|eot)$/.test(assetInfo.names[0])) {
              return `fonts/[name].[ext]`;
            }
            // 分离more-themes中的主题样式
            // 要用originalFileNames，names是编译处理过的css文件名，且不含路径信息
            // if (/\/src\/styles\/more-themes\/.+\.scss$/.test(assetInfo.originalFileNames[0])) {
            //   return `themes/[name]-[hash].[ext]`;
            // }
            return `[ext]/[name]-[hash].[ext]`;
          },
          codeSplitting: {
            // minShareCount: 1,
            // minSize: 10240,
            groups: [
              // node_modules内非过大且易变更文件统一打包到vendor
              {
                // minShareCount: 2,
                test: /\/node_modules\/(?!quasar|vant)/,
                name: 'vendor',
                priority: 10
              },
              // 语言文件单独打包
              {
                test: /\/src\/assets\/locale\/.+\/index\.ts$/,
                name: (id: string) => {
                  const locale = id.match(/\/([a-zA-Z-]+)\/index\.ts$/)!;
                  return `locale/${locale[1]}`;
                },
                priority: 9
              },
              // src中的公共文件打包到一起
              // {
              //   test: /\/src\/(?:components|utils)\//,
              //   name: 'main',
              //   priority: 9
              // },
              {
                test: (id: string) =>
                  /\/src\/(?:main|store)\.ts$/.test(id) || /\/src\/(?:components|utils)\//.test(id),
                name: 'main',
                priority: 9
              },
              {
                /**
                 * 针对页面实现类似webpack魔法注释`webpackChunkName`的效果
                 * @example
                 * login.un.loginPage.vue 将打包到 loginPage.js
                 * login.un.loginPage.vue 与 home.un.loginPage.vue 将会把2个页面打包到同一个 loginPage.js
                 */
                priority: 99,
                name: (id: string) => {
                  const uniteChunk = id.match(/\.un\.(\w+)\.vue$/);
                  if (uniteChunk) return uniteChunk[1];
                }
              }
            ]
          }
        }
      }
    },
    server: {
      host: '0.0.0.0',
      hmr: true,
      // port,
      // proxy,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  };
});
