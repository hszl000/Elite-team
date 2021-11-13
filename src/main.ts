//main.js
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router"
import axios from 'axios'
const app = createApp(App)
// 配置默认路径
axios.defaults.baseURL =
  'https://www.fastmock.site/mock/09a195a60460c7e332aa77e14a1921a7/elite'

app.use(ElementPlus)
app.use(router)
app.mount('#app')