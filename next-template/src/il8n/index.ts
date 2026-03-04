import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'
/**
 * 创建 i18n 实例
 *  @legacy （文档/组合式api）
 *  @locale 默认语言
 *  @fallbackLocale 回退语言
 * 作用 ：如果在当前选定的语言包（例如 en-US ）中找不到某个翻译键（key），插件会自动去 zh-CN 包中查找对应的翻译。这能有效防止页面出现空白或直接显示键名的情况。
 *  @messages 加载具体的语言包资源。
 */

const i18n = createI18n({
  legacy: false, //表示 禁用 Legacy API（Options API）模式 ，全面启用 Composition API 模式。
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})
/**
 * 安装 i18n 插件
 * @param app Vue 应用实例
 */
export const installI18n = (app: App) => {
  app.use(i18n)
}
