import { computed } from 'vue'
import { useStore } from 'vuex'

// 购物车相关逻辑
export const commonCartEffect = (shopId) => {
  const store = useStore()
  const { cartList } = store.state.cartModule
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('cartModule/changeCartItemInfo', { shopId, productId, productInfo, num })
  }

  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const productId in productList) {
      const product = productList[productId]
      if (product.count) {
        notEmptyProductList[productId] = product
      }
    }
    return notEmptyProductList
  })

  const cartConfig = computed(() => {
    // 全选、购物车红点数、购物车总价
    const result = { checkAll: true, total: 0, price: 0 }
    const productList = cartList[shopId]?.productList
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.price += product.count * product.price
        }
        if (product.count && !product.check) {
          result.checkAll = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })

  return { cartList, shopName, productList, cartConfig, changeCartItemInfo }
}
