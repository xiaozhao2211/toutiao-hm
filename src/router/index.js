import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '*',
  component: () => import('../views/404')
},
{
  path: '/home',
  name: 'home',
  component: Home,
  children: [{
    path: '',
    component: Home2
  }, {
    path: 'comment',
    component: () => import('../views/comment')
  }, {
    path: 'material',
    component: () => import('../views/material')
  },
  {
    path: 'articles',
    component: () => import('../views/articles')
  }, {
    path: 'publish',
    component: () => import('../views/publish')// 发布文章
  }, {
    path: 'publish/:articleId',
    component: () => import('../views/publish')// 修改文章
  }, {
    path: 'account',
    component: () => import('../views/account')// 账户信息
  },
  {
    path: 'graphic-data',
    component: () => import('../views/graphic-data')// 图文数据
  }]
},
{
  path: '/login',
  component: Login
}
// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () =>
//             import(/* webpackChunkName: "about" */ '../views/About.vue')
// }
]

const router = new VueRouter({
  routes
})

export default router
