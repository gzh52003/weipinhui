import Vue from "vue";
import Home from "../pages/Home.vue";
import User from "../pages/user/Default.vue";
import Order from "../pages/Order.vue";
import Goods from "../pages/Goods.vue";
import Reg from "../pages/Reg.vue";
import Login from "../pages/Login.vue";
import Add from "../pages/user/Add.vue";
import List from "../pages/user/List.vue";
import NotFound from "../pages/NotFound.vue";

import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes:[
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/user',
      component:User,
      children:[
        {
          path:'',
          redirect:'list'
        },
        {
          path:'add',
          component:Add
        },
        {
          path:'list',
          component:List
        },
      ]
    },
    {
      path:'/order',
      component:Order
    },
    {
      path:'/goods',
      component:Goods
    },
    {
      path:'/reg',
      component:Reg
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/404',
      component:NotFound
    },
    {
      path:'*',
      redirect:'/404'
    }
  ]
})

export default router;