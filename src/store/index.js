import { createStore } from 'vuex'

import cartModule from './modules/cart'
import addressModule from './modules/address'
import userModule from './modules/user'
import getters from './getters'

export default createStore({
  modules: {
    cartModule,
    addressModule,
    userModule
  },
  getters
})
