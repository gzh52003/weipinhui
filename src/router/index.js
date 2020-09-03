import Vue from 'vue'
import Home from '../pages/Home.vue'
import User from '../pages/user/Default.vue'
import Userlist from '../pages/user/List.vue'
import Useradd from '../pages/user/Add.vue'
import UserEdit from '../pages/user/Edit.vue'
import Goods from '../pages/goods/Default.vue'
import Goodslist from '../pages/goods/List.vue'
import Goodsadd from '../pages/goods/Add.vue'
import GoodsEdit from '../pages/goods/Edit.vue'
import Order from '../pages/Order.vue'
// import Index from '../pages/Index.vue'
import Reg from '../pages/Reg.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'
import request from '../utils/request'
// 引入router
import VueRouter from 'vue-router'
// import 'element-ui/lib/theme-chalk/index.css';

// 使用
Vue.use(VueRouter)




const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/home',
            meta: {
                requiresAuth: true
            },
        }, {
            path: '/home',
            component: Home,
            meta: {
                requiresAuth: true
            },
        }, {
            path: '/user',
            component: User,
            meta: {
                requiresAuth: true
            },
            children: [{

                path: '',
                redirect: 'list'
            }, {

                path: 'list',
                component: Userlist
            }, {
                path: 'add',
                component: Useradd
            }, {
                name: 'userEdit',
                path: 'edit/:id',
                component: UserEdit
            }]

        }, {
            path:'/goods',
            component:Goods,
            children:[{
                path:'',
                redirect:'glist'
            },{
                path:'glist',
                component:Goodslist
            },{
                path:'gadd',
                component:Goodsadd
            },{
                name:'goodsEdit',
                path:'edit/:id',
                component:GoodsEdit
            }]
        }, {
            path: '/order',
            component: Order,
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/reg',
            component: Reg
        }, {
            path: '/login',
            component: Login
        }, {
            path: '/404',
            component: NotFound
        }, {
            path: '*',
            redirect: './404'
        }
    ]
})

// 全局路由守卫
// beforeEach：在路由切换前执行
router.beforeEach(function (to, from, next) {
    if (to.matched.some(item=>item.meta.requiresAuth)) {
        let userInfo = localStorage.getItem('userInfo') || {}
        try {
            userInfo = JSON.parse(userInfo)
        } catch(err) {
            // router.push('/login')
            userInfo = {}
        }

        // 判断当前用户信息是否包含token
        if(userInfo.authorization){
            request.get('/jwtverify',{
                params:{
                    authorization:userInfo.authorization
                }
            }).then(({data})=>{
                if(data.code===0){
                    next({
                        path:'/login',
                        query:{
                            // 跳转到登录页面，并传达页面路径
                            redirectTo:to.fullPath
                        }
                    })
                }
            })
            next()
        }else{
            next({
                path:'/login',
                query:{
                    // 跳转到登录页面，并传达页面路径
                    redirectTo:to.fullPath
                }
            })
        }
    }
    next()
})

export default router;