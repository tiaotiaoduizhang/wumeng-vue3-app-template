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
