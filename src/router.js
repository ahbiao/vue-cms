// 导入路由组件
import HomeContainer from './components/tabbars/HomeContainer.vue'
import MemberContainer from './components/tabbars/MemberContainer.vue'
import ShopcarContainer from './components/tabbars/ShopcarContainer.vue'
import SearchContainer from './components/tabbars/SearchContainer.vue'

// 
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: HomeContainer
        },
        {
            path: '/member',
            component: MemberContainer
        },
        {
            path: '/shopcar',
            component: ShopcarContainer
        },
        {
            path: '/search',
            component: SearchContainer
        },{
            path: '/home/newslist',
            component: NewsList
        },{
            path:'/home/newslist/:id',
            component:NewsInfo,
            props:true//启用props来接收路由传来的参数
        }
    ]
})

export default router