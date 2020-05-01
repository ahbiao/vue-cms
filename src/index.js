// 打包文件主入口

// 导入vue模块
import Vue from 'vue'

// 导入根组件
import App from './components/App.vue'

// 导入vant,并安装
import { NavBar,Tabbar, TabbarItem,Swipe, SwipeItem ,Lazyload} from 'vant'
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload, {
    lazyComponent: true,
  })

// 配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

// 导入axios
import axios from 'axios'

Vue.prototype.$http=axios.create({
    baseURL:'http://www.liulongbin.top:3005/'//配置全局axios请求根路径
})
// 创建vm实例
const vm=new Vue({
    el:'#app',
    render:c=>c(App),
    router
})