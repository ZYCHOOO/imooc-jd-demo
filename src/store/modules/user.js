import { get } from '@/utils/request'

export const setUserInfo = (state) => {
  const { userInfo } = state
  const userInfoString = JSON.stringify(userInfo)
  localStorage.userInfo = userInfoString
}

export const getUserInfo = () => {
  try {
    return JSON.parse(localStorage.userInfo)
  } catch (e) {
    return null
  }
}

export const setToken = (state) => {
  const { token } = state
  localStorage.token = token
}

export const getToken = () => {
  return localStorage.token || ''
}

export default {
  namespaced: true,
  state: {
    userInfo: getUserInfo(),
    token: getToken()
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setUserInfo(state)
    },
    setToken (state, token) {
      console.log('token get', 22222)
      state.token = token
      setToken(state)
    }
  },
  actions: {
    async getUserInfo ({ commit }) {
      const result = await get('/api/user/info')
      console.log('????', result)
      commit('setUserInfo', result.data)
    },
    getToken ({ commit }) {
      return new Promise((resolve, reject) => {
        const token = 'Bearer 1234567'
        try {
          commit('setToken', token)
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    }
  }
}
