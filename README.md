# wumeng-vue3-app-template
参考链接：https://mp.weixin.qq.com/s/keRHIku4AJ7q57cjL_qB4g
- pinia  官方状态管理
- pinia-plugin-persistedstate  状态管理持久化插件
- vueuse  常用的 vue 组合式 api 工具库
- unocss  原子 css 框架

# 需要了解的插件如下
- unplugin-vue-router  基于文件系统的路由插件  
  > 约定大于配置，自动根据 `src/pages` 目录结构生成路由。无需手动维护 `router/index.ts` 中的路由表。
- unplugin-auto-import  自动引入插件
  > 自动导入 Vue、Vue Router、Pinia 等常用 API（如 `ref`, `computed`, `useRouter`），解放双手，无需在每个文件中手动 import。
- unplugin-vue-components  组件自动注册插件
  > 自动扫描并按需加载组件。在模板中直接使用 `src/components` 下的组件或 UI 库组件，无需手动 import 和注册。
- vite-plugin-vue-layouts  基于文件系统的布局插件
  > 配合文件路由使用，支持多种布局模式（如默认布局、空白布局）。通过在页面组件中添加 `<route lang="yaml">` 块来指定布局。

# pinia 状态管理
- storeToRefs 是 Pinia 提供的一个辅助函数，用于 解构 Store 中的状态（State）和计算属性（Getters）时保持其响应性 。
 > 如果不使用，解构出的变量会丢失响应性 
 > 只用于状态（state，getters）不用于方法（actions_函数）可以直接解构，不需要用 storeToRefs ，因为函数本身不需要响应性。
 > 错误用法 const { counter } = demoStore 

# CSS 预处理器 - SCSS
常见的css构架模式:
- BEM 最通用的命名规范，核心解决
- ACSS （如tailwind）是高效开发模式，最小粒度互用，适合快速迭代的项目
- ITCSS/SMACSS 侧重文件 / 样式分类，适合超大型项目的长期维护
>核心思想：按 “特异性（Specificity）” 从低到高、“作用域” 从全局到局部的顺序组织 CSS 文件，形成倒三角结构，避免样式覆盖和优先级问题。
- OOCSS 
>核心思想：将 CSS 样式视为可复用的 “对象”，核心是分离结构（Structure）和皮肤（Skin）、分离容器（Container）和内容（Content）。


- settings （设计令牌）
 > 样式变量的定义，如颜色值，尺寸，字体大小等基础变量
- base （全局通用的定制化样式）
 > 覆盖 Element Plus、VXE Table 的默认样式
 > 设置 html、body 的样式
- components （自定义的组件的样式，每个组件自行维护，不需要抽取到公共目录中）
 >  采用ACSS模式，具体实现使用 UnoCSS

 - src/plugins/assets.ts
 > 为了保持 main.ts的简洁，创建一个专门的资源管理模块，统一处理所有静态资源的导入：
 
 - 高性能、可定制的原子化 CSS 框架
 > 采用 UnoCSS ，无需手动编写 CSS 类名，直接在模板中使用原子类即可。

# CSS 图标依赖（4种方案）
- iconify-icon  图标库
>链接： https://icon-sets.iconify.design/

- 本地SVG图标
> 本地 SVG 图标存储在 `src/assets/icons` 目录下，文件名作为图标名称。
> 例如：`src/assets/icons/demo.svg` 对应的图标名称为 `demo`。

- 封装强大图标组件，支持4种方式 
  - Iconify Icon
  - UnoCSS Icon （本质上也是 Iconify Icon）
  - 本地 svg 图标
  - 本地或在线的 Iconfont