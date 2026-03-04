import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type RouteLocationNormalized,
} from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'
import i18n, { loadLanguage } from '@/il8n'

/**
 * @createRouter 创建路由实现
 * @reateWebHistory （html5模式）url不带#号
 * @routes 路由映射 routes 数组定义了 URL 路径与 Vue 组件的对应关系
 * @installRouter  自定义导出函数
 * @use 是 Vue 3 应用实例用来 安装插件 的标准方法
 *
 */
import type { App } from 'vue'
/**
 * 含义:表示从'vue' 模块中导入类型定义App,(用来做类型注解)
 * 作用:用于类型检查,确保在使用app.use(router)时,参数router的类型是App
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  /**
   * 访问的路径外面又包裹了一层组件，需要修改 unplugin-vue-router自动生成的路由数组 routes
   */
  routes: setupLayouts(routes as unknown as RouteRecordRaw[]),
})
const loadRouteLocales = async (to: RouteLocationNormalized) => {
  const currentLang = localStorage.getItem('locale') || 'zh-CN'
  // 确保通用语言已加载
  await loadLanguage(currentLang)
  // 加载路由所需的语言模块
  // 1. 检查目标路由（to）的元数据中是否定义了 locales 字段
  if (to.meta.locales) {
    // 2. 遍历 locales 数组（例如 ['demo1', 'order']）
    for (const locale of to.meta.locales as string[]) {
      try {
        // 3. 动态导入翻译文件
        // 路径规则：@/il8n/locales/modules/{当前语言}/{模块名}.ts
        // 例如当前语言是 zh-CN，模块是 demo1，则加载 src/il8n/locales/modules/zh-CN/demo1.ts
        await import(`@/il8n/locales/modules/${currentLang}/${locale}.ts`).then((messages) => {
          // 4.合并到当前语言的消息中  global.mergeLocaleMessaget添加本地语言包
          console.log(messages, 'messages.default',locale)
          i18n.global.mergeLocaleMessage(currentLang, {
            [locale]: messages.default,
          })
        })
      } catch (e) {
        console.warn(`Failed to load locale module:${locale}`, e)
      }
    }
  }
}
// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  await loadRouteLocales(to)
  next()
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
