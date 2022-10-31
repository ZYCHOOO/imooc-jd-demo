<template>
  <div class="cart">
    <div class="cart__header">{{ cartHeader }}</div>
    <div class="cart__content">
      <cart-item
        v-for="cartItem in cartList"
        :key="cartItem.shopName"
        :shop-name="cartItem.shopName"
        :product-list="cartItem.productList"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, computed } from 'vue'
import { commonCartEffect } from '@/effects/cartEffect'

const cartEffect = (cartList) => {
  const cartHeader = computed(() => {
    let cartTotal = 0
    for (const shopId in cartList) {
      const productList = cartList[shopId].productList
      for (const productId in productList) {
        cartTotal = cartTotal + productList[productId].count
      }
    }
    return `我的全部购物车（${cartTotal}）`
  })
  return { cartHeader }
}

export default {
  name: 'Cart',
  components: {
    CartItem: defineAsyncComponent(() => import('@/components/CartItem'))
  },
  setup () {
    const { cartList } = commonCartEffect()
    const { cartHeader } = cartEffect(cartList)
    return { cartHeader, cartList }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/mixins.scss';
  @import '~@/style/variables.scss';
  .cart {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: .49rem;
    right: 0;
    padding: 0 .18rem;
    background: $default-bg-color;
    &__header {
      @include flex-center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: .44rem;
      background: $light-color;
    }
    &__content {
      margin-top: .6rem;
    }
  }
</style>
