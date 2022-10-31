import router from '@/router'

// router.beforeEach((to, from, next) => {
//   const { isLogin } = localStorage
//   const { name } = to
//   const toLoginOrRegister = name === 'Login' || name === 'Register';
//   (isLogin || toLoginOrRegister) ? next() : next({ name: 'Login' })
// })
import store from '@/store'
import { getUserInfo, getToken } from '@/store/modules/user'

router.beforeEach(async (to, from, next) => {
  const userInfo = getUserInfo()
  const token = getToken()

  if (userInfo) {
    if (!token) {
      await store.dispatch('userModule/getToken')
      next({ name: 'Home' })
    } else {
      next()
    }
  } else {
    debugger
    try {
      await store.dispatch('userModule/getUserInfo')
      console.log(store.state.userModule.userInfo, 'userInfo get')
      store.dispatch('userModule/getToken')
    } finally {
      next({ name: 'Home' })
    }
  }
})
