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
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'
export default defineConfig({
  plugins: [
    VueRouter({
      /* options */
    }),
    /* VueRouter() 插件需要在 Vue() 插件之前进行注册也需要在Layouts之前 */
     Layouts({
      layoutsDirs: 'src/layouts', // 指定布局文件的目录路径
      defaultLayout: 'default' // 指定默认布局文件的名称
    }),
    vue(),
    vueJsx(),
    // vueDevTools(),
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
})
