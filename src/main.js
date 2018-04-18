import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import * as filters from './filters' // 全局filter

import '@/icons' // icon
// import '@/permission' // permission control

import Post from '@/api/post'
Post({
	url:'admin/login',
	data:{
		loginName:'xiaomi',
		loginPassword:123456
	},
	success:res=>{
		console.log(res)
	}
})

Vue.use(ElementUI, { locale })
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
