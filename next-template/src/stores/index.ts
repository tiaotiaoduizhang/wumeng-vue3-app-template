import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { App } from 'vue'
/**
 *  模块化注册pinnia 封装pinia实例
 *  @param app Vue 应用实例
 *  @createPinia 创建 Pinia 实例
 */
// 创建 Pinia 实例
const pinia = createPinia()
// 使用插件
pinia.use(piniaPluginPersistedstate);
export const installPinia = (app: App) => {
  app.use(pinia)
}
