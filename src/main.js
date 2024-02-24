import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'element-plus/theme-chalk/src/message.scss'

import '@/assets/style/style.css'

import App from './App.vue'
import router from './router'

createApp(App).use(createPinia()).use(router).mount('#app')
