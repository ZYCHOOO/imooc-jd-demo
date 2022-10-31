import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'normalize.css'
import '@/style/index.scss'
import 'vant/lib/index.css'

import '@/router/permission.js'

createApp(App).use(store).use(router).use(Vant).mount('#app')
