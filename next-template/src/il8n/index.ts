import type { App } from 'vue' //导入 Vue 应用实例的类型
import { createI18n } from 'vue-i18n' //创建国际化实例
/**
 * 1.自动识别浏览器语言，优先使用本地存储的语言设置
 * 2.初始化 vue-i18n 实例（适配 Composition API）
 * 3.提供动态加载语言包的方法，支持语言切换并持久化
 * 4.对外暴露安装方法，方便在 Vue 应用入口全局注册
 */
/**
 * 获取浏览器的语言
 * navigator.language ：浏览器的语言设置，例如 'zh-CN' 或 'en-US'。
 * (navigator as any).userLanguage：兼容 IE 等旧浏览器的写法（非标准）。
 */

const getBrowserLanguage = () => {
  const browserLang = navigator.language || (navigator as any).userLanguage
  return ['zh-CN', 'en-US'].includes(browserLang) ? browserLang : 'zh-CN'
}

// 确定当前使用的语言(用户手动切换过语言后，下次打开页面会保留上次的选择。)
const currentLang = localStorage.getItem('locale') || getBrowserLanguage()
/**
 * 创建 i18n 实例
 *  @legacy 关键配置！启用 Vue 3 的 Composition API 模式（若设为 true 则兼容 Vue 2 的 Options API）。
 *  @locale 默认语言
 *  @fallbackLocale 回兜底语言 —— 如果某个语言的文案缺失，会自动使用该语言的文案（这里是中文）。
 *  @messages 初始为空，因为语言包是动态加载的
 */

const i18n = createI18n({
  legacy: false,
  locale: currentLang,
  fallbackLocale: 'zh-CN',
  messages: {
    // 'zh-CN': zhCN,
    // 'en-US': enUS,
  },
})
/**
 * 动态加载语言包
 */
export async function loadLanguage(lang: string) {
  // 按需加载指定语言的消息字典文件（Vite 动态导入会进行代码分割，每种语言生成独立 chunk）
  return import(`./locales/${lang}.ts`).then((messages) => {
    // messages 是模块对象，messages.default 为该模块默认导出的消息字典
    // 将该语言的字典注册到 i18n 全局实例，后续 t/$t 会使用最新语言的文案
    i18n.global.setLocaleMessage(lang, messages.default)
    // 将当前选择的语言持久化到本地，刷新或下次打开页面仍会保持该语言
    localStorage.setItem('locale', lang)
    // 返回当前语言代码，便于调用方链式处理或更新状态
    return lang
  })
}
// 初始化加载当前语言包
loadLanguage(currentLang)
/**
 * 安装 i18n 插件
 * @param app Vue 应用实例
 */
export const installI18n = (app: App) => {
  app.use(i18n)
}
// 暴露 i18n 实例，方便在组件中直接导入使用
export default i18n
