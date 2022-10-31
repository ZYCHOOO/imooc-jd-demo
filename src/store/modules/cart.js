const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  // 第一层级是商铺id
  // 第二层级是商品id（内容是商品信息及商品数量）
  // { shopId: { shopName: '', productList: { productId: {} }}}
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}

export default {
  namespaced: true,
  state: { cartList: getLocalCartList() },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count = product.count + num
      if (payload.num) { product.check = true }
      if (product.count < 0) { product.count = 0 }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    clearCart (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    toggleCartCheckAll (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
    },
    toggleCartItemCheck (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
    },
    clearCartData (state, shopId) {
      state.cartList[shopId].productList = {}
    }
  }
}
