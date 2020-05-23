import Vue from 'vue'
// 导入vant,并安装
import {
	NavBar,
	Tabbar,
	TabbarItem,
	Swipe,
	SwipeItem,
	Lazyload,
	Grid,
	GridItem,
	Image as VanImage,
	PullRefresh,
	List,
	Cell,
	Icon,
	Field,
	Button,
	Panel,
	CellGroup,
	Toast,
	Tab,
	Tabs,
	Loading,
	ImagePreview,
	Stepper,
	Card,
	Tag,
	Checkbox,
	CheckboxGroup,
	SubmitBar
} from 'vant'
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload, {
	lazyComponent: true
})
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Field);
Vue.use(Button);
Vue.use(Panel);
Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Loading);
Vue.use(ImagePreview);
Vue.use(Stepper);
Vue.use(Card);
Vue.use(Tag);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(SubmitBar);



// 导入axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
	baseURL: 'http://api.cms.liulongbin.top/' //配置全局axios请求根路径
})

// 导入全局样式
import './css/style.css'

// 导入过滤器
import './filters.js'