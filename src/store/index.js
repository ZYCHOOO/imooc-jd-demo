import { createStore } from 'vuex'

import cartModule from './modules/cart'
import addressModule from './modules/address'
import getters from './getters'

export default createStore({
  modules: {
    cartModule,
    addressModule
  },
  getters
})
