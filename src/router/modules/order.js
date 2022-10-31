const routes = [{
  path: '/order',
  name: 'Order',
  component: () => import(/* webpackChunkName: 'jd-order' */ '@/views/order/Order')
}, {
  path: '/confirmOrder/:id',
  name: 'ConfirmOrder',
  component: () => import(/* webpackChunkName: 'jd-confirm-order' */ '@/views/order/ConfirmOrder')
}]

export default routes
