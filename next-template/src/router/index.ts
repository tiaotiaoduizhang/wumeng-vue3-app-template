
import { createRouter, createWebHistory } from 'vue-router'
import { routes,handleHotUpdate } from 'vue-router/auto-routes'
/**
 * @createRouter 创建路由实现
 * @reateWebHistory （html5模式）url不带#号
 * @routes 路由映射 routes 数组定义了 URL 路径与 Vue 组件的对应关系 
 * @installRouter  自定义导出函数
 * @use 是 Vue 3 应用实例用来 安装插件 的标准方法
 * 
 */
import type {App} from 'vue'
/**
 * 含义:表示从'vue' 模块中导入类型定义App,(用来做类型注解)
 * 作用:用于类型检查,确保在使用app.use(router)时,参数router的类型是App
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, 
  // routes: [{
  //   path: '/',
  //   name: 'demo',
  //   component: () => import('@/views/DemoView.vue'),
  // }],
})
/**
 * import.meta.hot Vite 提供的开发环境 API，用于判断当前是否运行在支持热更新的开发服务器中。
 * handleHotUpdate 监听 pages 目录下的文件变化 自动重新生成路由配置。无需刷新整个页面
 */
if (import.meta.hot) { 
  handleHotUpdate(router) 
} 
export const installRouter = (app: App) => {
  app.use(router)
}
export default router
