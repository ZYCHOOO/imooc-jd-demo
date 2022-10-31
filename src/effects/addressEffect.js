// import { computed } from 'vue'
import { useStore } from 'vuex'

// 地址管理相关逻辑
export const commonAddressEffect = () => {
  const store = useStore()
  const { addressList } = store.state.addressModule
  return { addressList }
}
