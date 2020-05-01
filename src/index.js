// 打包文件主入口

// 导入vue模块
import Vue from 'vue'
// 导入根组件
import App from './components/App.vue'

// 创建vm实例

const vm=new Vue({
    el:'#app',
    render:c=>c(App)
})