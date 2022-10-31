const routes = [{
  path: '/address',
  name: 'Address',
  component: () => import(/* webpackChunkName: 'jd-address' */ '@/views/address/Address')
}, {
  path: '/addAddress',
  name: 'AddAddress',
  component: () => import(/* webpackChunkName: 'jd-addAddress' */ '@/views/address/AddAddress')
}, {
  path: '/editAddress',
  name: 'EditAddress',
  component: () => import(/* webpackChunkName: 'jd-editAddress' */ '@/views/address/EditAddress')
}]

export default routes
