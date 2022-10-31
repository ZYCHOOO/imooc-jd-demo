import { createRouter, createWebHashHistory } from 'vue-router'
import loginRoutes from './modules/login'
import orderRoutes from './modules/order'
import addressRoutes from './modules/address'

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import(/* webpackChunkName: "jd-home" */ '@/views/home/Home')
},
{
  path: '/shop/:id',
  name: 'Shop',
  component: () => import(/* webpackChunkName: "jd-shop" */ '@/views/shop/Shop')
}, {
  path: '/cart',
  name: 'Cart',
  component: () => import(/* webpackChunkName: 'jd-cart' */ '@/views/cart/Cart')
}, {
  path: '/mine',
  name: 'Mine',
  component: () => import(/* webpackChunkName: 'jd-mine' */ '@/views/mine/Mine')
}, {
  path: '/demo',
  name: 'Demo',
  component: () => import(/* webpackChunkName: 'jd-demo' */ '@/views/Demo')
},
...loginRoutes,
...addressRoutes,
...orderRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
