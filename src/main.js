import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts'
import App from './App.vue'
import router from './router'
import store from './store'
import chinaMap from '@/assets/json/china.json'

echarts.registerMap('china', chinaMap)
const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.use(ElementPlus).use(store).use(router).mount('#app')
