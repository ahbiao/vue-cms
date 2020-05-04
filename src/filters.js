import Vue from 'vue'
// 导入格式化时间的模块
import moment from 'moment'
//全局过滤器   格式化时间
Vue.filter('dateFormat', (dateStr,formatStr='YYYY-MM-DD HH:mm:ss')=> {
	return moment(dateStr).format(formatStr)
})
