import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import request from './utils/request'


// webpack加工  不是esmodel的使用方式  造成大量的浪费  后面将优化方式
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI)

// 通过原型链共享ajax请求的方法
Vue.prototype.$request = request
new Vue({
    // 把router注入Vue实例
    router,
    render:h=>h(App),
}).$mount('#app')