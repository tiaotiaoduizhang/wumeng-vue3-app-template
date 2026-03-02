import { createApp } from 'vue'
import App from './App.vue'
import { installRouter } from '@/router'
import { installPinia } from '@/stores'
import { installAssets } from '@/plugins/assets'
// 获取当前模式
const currentMode = import.meta.env.MODE
console.log('当前模式:', currentMode)
const app = createApp(App)
installRouter(app)
installPinia(app)
installAssets()
app.mount('#app')
