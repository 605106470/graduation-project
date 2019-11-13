import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Sellgoods from '@/views/sellgoods.vue'
import Minegoods from '@/views/minegoods.vue'
import Rootlogin from '@/views/rootlogin.vue'
import Root from '@/views/root.vue'
import Rootuserlist from '@/views/rootuserlist.vue'
import Rootgoodlist from '@/views/rootgoodlist.vue'
import Rootmessagelist from '@/views/rootmessagelist.vue'
import Mycart from '@/views/mycart.vue'
import Pay from '@/views/pay.vue'
import Buygoods from '@/views/buygoods.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/sellgoods',
      name: 'sellgoods',
      component: Sellgoods
    },
    {
      path: '/minegoods',
      name: 'minegoods',
      component: Minegoods
    },
    {
      path: '/rootlogin',
      name: 'rootlogin',
      component: Rootlogin
    },
    {
      path: '/root',
      name: 'root',
      component: Root
    },
    {
      path: '/rootuserlist',
      name: 'rootuserlist',
      component: Rootuserlist
    },
    {
      path: '/rootgoodlist',
      name: 'rootgoodlist',
      component: Rootgoodlist
    },
    {
      path: '/rootmessagelist',
      name: 'rootmessagelist',
      component: Rootmessagelist
    },
    {
      path: '/mycart',
      name: 'mycart',
      component: Mycart
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/buygoods',
      name: 'buygoods',
      component: Buygoods
    }
  ]
})
