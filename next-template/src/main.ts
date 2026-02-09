import { createApp } from 'vue'
import App from './App.vue'
import { installRouter } from '@/router'
import { installPinia } from '@/stores'
const app = createApp(App)
installRouter(app)
installPinia(app)
app.mount('#app')
