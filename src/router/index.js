import Vue from 'vue'
import Home from '../pages/Home.vue'
import User from '../pages/user/Default.vue'
import Userlist from '../pages/user/List.vue'
import Useradd from '../pages/user/Add.vue'
import UserEdit from '../pages/user/Edit.vue'
import Goods from '../pages/Goods.vue'
import Order from '../pages/Order.vue'
import Reg from '../pages/Reg.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'
// 引入router
import VueRouter from 'vue-router'

// import 'element-ui/lib/theme-chalk/index.css';

// 使用
Vue.use(VueRouter)




const router = new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/home'
        },{
            path:'/home',
            component:Home
        },{
            path:'/user',
            component:User,
            children:[{
                
                path:'',
                redirect:'list'
            },{

                path:'list',
                component:Userlist
            },{
                path:'add',
                component:Useradd
            },{
                name:'userEdit',
                path:'edit/:id',
                component:UserEdit
            }]

        },{
            path:'/goods',
            component:Goods
        },{
            path:'/order',
            component:Order
        },{
            path:'/reg',
            component:Reg
        },{
            path:'/login',
            component:Login
        },{
            path:'/404',
            component:NotFound
        },{
            path:'*',
            redirect:'./404'
        }]
})

export default router;