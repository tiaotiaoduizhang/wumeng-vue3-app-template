/**
 * 用途：Node.js 在 ESM（ECMAScript Modules）模式下处理文件路径的标准写法
 * URL ：用于解析和操作 URL 的类。
 * fileURLToPath ：将 file:// 协议的 URL 转换为当前操作系统的绝对文件路径（例如把 file:///C:/project/src 转为 C:\project\src ）。
 对比我们公司那种写法这种更贴合于vue3+vite写法
 特性	fileURLToPath + URL (ESModule)	path.resolve + process.cwd() (CommonJS)
模块规范	ESModule (ESM) 原生语法	CommonJS (CJS) 模块语法
路径类型	先通过 URL 生成文件 URL，再转绝对路径	直接基于当前工作目录生成文件系统绝对路径
运行环境依赖	依赖 import.meta.url（仅 ESM 支持）	依赖 process.cwd()（Node.js 环境变量）
路径稳定性	基于文件自身位置，不受执行目录影响	受执行 node 命令的目录影响   
*/
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
//vite.config.ts 中访问环境变量，需要使用 loadEnv 函数
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'
// 默认导入vue,pinia,vue-router
import AutoImport from 'unplugin-auto-import/vite'
/**
 * 集成了自动路由，自动导入 Vue Router 相关的函数和类型。
 * 例如，useRouter、useRoute 等。
 */
import { VueRouterAutoImports } from 'unplugin-vue-router'
/**
 * 组件自动化配置
 *  @deep 是否递归扫描子目录（默认：true）
 *  @directoryAsNamespace  开启「目录作为命名空间」
 *  组件路径：src/components/Form/Input.vue
 *  开启 directoryAsNamespace: true 后，使用时需写 <FormInput />（目录名 + 组件名）；
 *  不开启则直接写 <Input />。
 */
import Components from 'unplugin-vue-components/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig(({ mode }) => {
  /**
   * 在配置中使用环境变量
   * 第一个参数 mode 表示当前的模式（例如 'development' 或 'production'）。
   * 第二个参数 process.cwd() 表示当前工作目录，通常是项目根目录。
   * 第三个参数是环境变量前缀，默认为 VITE_。如果设置为空字符串，则会加载所有环境变量
   */
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  //打印在终端看
  console.log(env)
  return {
    plugins: [
      VueI18nPlugin({
        // 语言包目录
        include: [path.resolve(__dirname, './src/locales/**')],
        // 开发模式下也启动编译时处理(true：生产构建)
        runtimeOnly: false,
        // 仅使用组合式 API
        compositionOnly: true,
        // 是否安装 Vue I18n 提供的所有 API、组件
        fullInstall: true,
      }),
      Components({
        deep: true,
        directoryAsNamespace: false,
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
          /\.md$/, // .md
        ],
        dirs: ['src/il8n', 'src/utils'],
        imports: ['vue', VueRouterAutoImports, 'pinia', '@vueuse/core'],
      }),
      VueRouter({
        /* options */
      }),

      /* VueRouter() 插件需要在 Vue() 插件之前进行注册也需要在Layouts之前 */
      Layouts({
        layoutsDirs: 'src/layouts', // 指定布局文件的目录路径
        defaultLayout: 'default', // 指定默认布局文件的名称
      }),
      vue(),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),
      vueJsx(),
      UnoCSS(),
      // 配置svg图标
      createSvgIconsPlugin({
        // SVG 图标目录
        iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
        /**
         * 生成的 symbol ID 格式
         * icon-固定前缀，你可以随意修改
         * [dir] ： 目录名占位符src/assets/icons常会被忽略 其他的就需要配置
         * [name]：文件名占位符
         * eg:src/assets/icons/home.svg  #icon-home
         * src/assets/icons/nav/top/logo.svg  #icon-nav-top-logo
         */
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      // 监听所有地址，包括局域网和公网地址
      host: true,
    },
  }
})
