const routes = [{
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "jd-login" */ '@/views/login/Login'),
  beforeEnter: (to, from, next) => {
    const { isLogin } = localStorage
    isLogin ? next({ name: 'Home' }) : next()
  }
}, {
  path: '/register',
  name: 'Register',
  component: () => import(/* webpackChunkName: "jd-register" */ '@/views/register/Register')
}]

export default routes
