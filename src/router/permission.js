import router from '@/router'

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const toLoginOrRegister = name === 'Login' || name === 'Register';
  (isLogin || toLoginOrRegister) ? next() : next({ name: 'Login' })
})
