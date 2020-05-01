// 导入路由组件
import HomeContainer from './components/tabbars/HomeContainer.vue'
import MemberContainer from './components/tabbars/MemberContainer.vue'
import ShopcarContainer from './components/tabbars/ShopcarContainer.vue'
import SearchContainer from './components/tabbars/SearchContainer.vue'
// 配置路由
import VueRouter from 'vue-router'

const router=new VueRouter({
    routes:[
        { path:'/',redirect:'/home'},
        { path:'/home',component:HomeContainer},
        { path:'/member',component:MemberContainer},
        { path:'/shopcar',component:ShopcarContainer},
        { path:'/search',component:SearchContainer},
    ]
})

export default router