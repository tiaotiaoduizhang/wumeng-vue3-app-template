import { createApp } from 'vue'
import App from './App.vue'
import { installRouter } from '@/router'
import { installPinia } from '@/stores'
import { installAssets } from '@/plugins/assets'
import { installI18n } from '@/il8n'
// 获取当前模式
const currentMode = import.meta.env.MODE
console.log('当前模式:', currentMode)
console.log('当前环境:', Env.env)
console.log('VITE_APP_NAME: ', Env.get('VITE_APP_NAME'))
console.log('VITE_APP_NAME: ', Env.get('VITE_APP_NAME'))
console.log('isDev', Env.env)
const app = createApp(App)
installRouter(app)
installPinia(app)
installAssets()
installI18n(app)
app.mount('#app')
