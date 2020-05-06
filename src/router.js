// 导入路由组件
import HomeContainer from './components/tabbars/HomeContainer.vue'
import MemberContainer from './components/tabbars/MemberContainer.vue'
import ShopcarContainer from './components/tabbars/ShopcarContainer.vue'
import SearchContainer from './components/tabbars/SearchContainer.vue'

// 新闻组件
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
// 图片组件
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
//商品列表
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
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
        }, {
            path: '/home/newslist',
            component: NewsList
        }, {
            path: '/home/newslist/:id',
            component: NewsInfo,
            props: true //启用props来接收路由传来的参数
        }, {
            path: '/home/photolist',
            component: PhotoList
        }, {
            path: '/home/photoinfo/:id',
            component: PhotoInfo,
            props: true
        }, {
            path: '/home/goodslist',
            component: GoodsList
        },{
            path: '/home/goodsinfo/:id',
            component: GoodsInfo,
            props:true
        }
    ]
})

export default router