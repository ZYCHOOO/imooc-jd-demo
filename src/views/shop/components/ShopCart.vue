<template>
  <div>
    <div v-if="showCart && cartConfig.total" class="mask" @click="toggleShowCart" />
    <div class="shop__cart">
      <div v-if="showCart && cartConfig.total" class="cart__products">
        <div class="cart__products__header">
          <div
            class="check__all"
            @click="toggleCartCheckAll(shopId)"
          >
            <div
              :class="{ 'cart__product__check': true, 'iconfont': true, 'cart__product__check--checked': cartConfig.checkAll }"
              v-html="cartConfig.checkAll ? '&#xe656;' : '&#xe667;'"
            />
            <span>全选</span>
          </div>
          <span
            class="clear__cart"
            @click="clearCart(shopId)"
          >
            清空购物车
          </span>
        </div>
          <div
            v-for="product in productList"
            :key="product._id"
            class="cart__product"
          >
            <div
              :class="{ 'cart__product__check': true, 'iconfont': true, 'cart__product__check--checked': product.check }"
              v-html="product.check ? '&#xe656;' : '&#xe667;'"
              @click="toggleCartItemCheck(shopId, product._id)"
            />
            <img :src="product.imgUrl" alt="" class="cart__product__img">
            <div class="cart__product__detail">
              <div class="cart__product__title">{{ product.name }}</div>
              <div class="cart__product__price">
                <span class="cart__product__yen">&yen;</span>{{ product.price }}
                <span class="cart__product__origin">&yen;{{ product.oldPrice }}</span>
              </div>
            </div>
            <div class="product__number">
              <span
                class="product__number__minus"
                @click="changeCartItemInfo(product._id, product, -1)"
              >
                -
              </span>
                {{ product.count || 0 }}
              <span
                class="product__number__plus"
                @click="changeCartItemInfo(product._id, product, 1)"
              >
                +
              </span>
            </div>
          </div>
      </div>
      <div class="shop__cart__icon" @click="toggleShowCart">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" alt="" class="shop__cart__img">
        <div v-if="cartConfig.total" class="shop__cart__tag">{{ cartConfig.total }}</div>
      </div>
      <div v-if="cartConfig.price > 0" class="shop__cart__price">
        <span>总计：</span>
        <span class="shop__cart__yen">&yen;{{ cartConfig.price }}</span>
      </div>
      <div v-else class="shop__cart__price">购物车是空的</div>
      <div
        :class="{ 'shop__cart__btn': true, 'shop__cart__btn--disabled': !cartConfig.total}"
        @click="handleOrder(shopId)"
      >
        去结算
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { commonCartEffect } from '@/effects/cartEffect'

// 购物车相关逻辑
const CartEffect = (shopId) => {
  const store = useStore()
  const router = useRouter()

  const clearCart = (shopId) => {
    store.commit('cartModule/clearCart', { shopId })
  }

  const toggleCartCheckAll = (shopId) => {
    store.commit('cartModule/toggleCartCheckAll', { shopId })
  }

  const toggleCartItemCheck = (shopId, productId) => {
    store.commit('cartModule/toggleCartItemCheck', { shopId, productId })
  }

  const handleOrder = (shopId) => { router.push({ path: `/confirmOrder/${shopId}` }) }

  return {
    clearCart,
    handleOrder,
    toggleCartCheckAll,
    toggleCartItemCheck
  }
}

// 购物车遮罩
const toggleCartEffect = () => {
  const showCart = ref(false)
  const toggleShowCart = () => {
    showCart.value = !showCart.value
  }
  return { showCart, toggleShowCart }
}

export default {
  name: 'ShopCart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, toggleShowCart } = toggleCartEffect()
    const { clearCart, handleOrder, toggleCartCheckAll, toggleCartItemCheck } = CartEffect(shopId)
    const { cartConfig, productList, changeCartItemInfo } = commonCartEffect(shopId)
    return {
      showCart,
      shopId,
      cartConfig,
      productList,
      changeCartItemInfo,
      toggleShowCart,
      clearCart,
      handleOrder,
      toggleCartCheckAll,
      toggleCartItemCheck
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/components/shopCart.scss';
</style>
