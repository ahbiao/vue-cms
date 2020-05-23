// 导入vuex
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

//取 localStorage

let car = window.JSON.parse(localStorage.getItem('cart')) || []

const store = new Vuex.Store({
	state: { //存放全局数据
		cart: car //购物车商品数组
	},
	mutations: { //操作state中的数据
		addToCar(state, goods) {
			let flag = false
			state.cart.some(item => {
				if (item.id === goods.id) {
					item.count += goods.count
					flag = true
					return true;
				}
			})
			if (!flag)
				state.cart.push(goods)
			localStorage.setItem('cart', window.JSON.stringify(state.cart))
		},
		updateGoodsCount(state, goods) {
			state.cart.some(item => {
				if (item.id == goods.id) {
					item.count = goods.count
					return true
				}
			})
			localStorage.setItem('cart', window.JSON.stringify(state.cart))
		},
		delFormCart(state, id) {
			state.cart.some((item, i) => {
				if (item.id == id) {
					state.cart.splice(i, 1)
					return true
				}
			})
			localStorage.setItem('cart', window.JSON.stringify(state.cart))
		},
		changeSelectState(state,obj){
			state.cart.forEach(item=>item.selected=false)
			obj.forEach(item=>{
				state.cart.some(items=>{
					if(parseInt(items.id)==item){
						items.selected=true
						return true
					}
				})
			})
			localStorage.setItem('cart', window.JSON.stringify(state.cart))
		}
	},
	getters: { //类似计算属性
		totalcount(state) {
			let c = 0
			state.cart.forEach(item => c += item.count)
			return c
		},
		idstr(state) {
			let arr = []
			state.cart.forEach(item => arr.push(item.id))
			return arr.join(',')
		},
		countObj(state) {
			let o = {}
			state.cart.forEach(item => o[item.id] = item.count)
			return o
		},
		selectedObj(state) {
			let o = []
			state.cart.forEach(item =>{ 
				if(item.selected)
					o.push(parseInt(item.id))
			})
			return o
		},
		selectedCount(state){
			let c=0
			state.cart.forEach(item=>{
				if(item.selected){
					c+=item.count
				}
			})
			return c
		},
		amount(state,price){
			//总价格
			let a=0
			state.cart.forEach(item=>{
				if(item.selected){
					a+=item.count*item.price
				}
			})
			return a
		}
	}
})
export default store