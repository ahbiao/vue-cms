// 打包文件主入口

// 导入vue模块
import Vue from 'vue'
// 导入全局配置模块
import './globalConfig.js'
// 导入根组件
import App from './components/App.vue'
// 导入路由
import router from './router.js'
//导入Vuex
import store from './store.js'

// 创建vm实例
const vm = new Vue({
	el: '#app',
	render: c => c(App),
	router,//挂载路由
	store //挂载store
})
