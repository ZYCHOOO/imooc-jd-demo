<template>
  <div class="shop__content">
    <div class="shop__content__categorys">
      <div
        v-for="category in categories"
        :key="category.id"
        :class="{ 'shop__content__category': true, 'shop__content__category--active': currentTab === category.tab }"
        @click="categoryClick(category.tab)"
      >
        {{ category.name }}
      </div>
    </div>
    <div class="shop__content__products">
      <div
        v-for="product in productList"
        :key="product._id"
        class="shop__product"
      >
        <img :src="product.imgUrl" alt="" class="shop__product__img">
        <div class="shop__product__detail">
          <div class="shop__product__title">{{ product.name }}</div>
          <div class="shop__product__sales">月售{{ product.sales }}件</div>
          <div class="shop__product__price">
            <span class="shop__product__yen">&yen;</span>{{ product.price }}
            <span class="shop__product__origin">&yen;{{ product.oldPrice }}</span>
          </div>
        </div>
        <div class="product__number">
          <span
            v-if="getProductCount(shopId, product._id)"
            class="product__number__minus"
            @click="changeCartItem(shopId, shopName, product._id, product, -1)"
          >
            -
          </span>
          <span v-if="getProductCount(shopId, product._id)">
            {{ getProductCount(shopId, product._id) }}
          </span>
          <span
            class="product__number__plus"
            @click="changeCartItem(shopId, shopName, product._id, product, 1)"
          >
            +
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watchEffect } from 'vue'
import { get } from '@/utils/request'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { commonCartEffect } from '@/effects/cartEffect'

const categories = [
  { id: 1, name: '全部商品', tab: 'all' },
  { id: 2, name: '秒杀', tab: 'seckill' },
  { id: 3, name: '新鲜水果', tab: 'fruit' }
]

// 侧边tab相关逻辑
const shopTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const categoryClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, categoryClick }
}

// 列表相关逻辑
const shopProductEffect = (currentTab, shopId) => {
  const data = reactive({ productList: [] })
  // 获取商品列表
  const getProductList = async () => {
    const result = await get(`/api/shop/${shopId}/products`, { tab: currentTab.value })
    if (result?.errno === 0 && result?.data?.length) {
      data.productList = result.data
    }
  }
  watchEffect(() => { getProductList() })
  const { productList } = toRefs(data)
  return { productList, getProductList }
}

// 勾选商品相关逻辑
const useCartEffect = (shopId) => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = commonCartEffect(shopId)
  const changeShopName = (shopId, shopName) => {
    store.commit('cartModule/changeShopName', { shopId, shopName })
  }
  const changeCartItem = (shopId, shopName, productId, productInfo, num) => {
    changeCartItemInfo(shopId, productId, productInfo, num)
    changeShopName(shopId, shopName)
  }
  const getProductCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { cartList, changeCartItem, getProductCount }
}

export default {
  name: 'ShopContent',
  props: {
    shopName: { type: String, default: '' }
  },
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, categoryClick } = shopTabEffect()
    const { productList } = shopProductEffect(currentTab, shopId)
    const { cartList, changeCartItem, getProductCount } = useCartEffect(shopId)
    return {
      categories,
      currentTab,
      productList,
      cartList,
      shopId,
      categoryClick,
      getProductCount,
      changeCartItem
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/components/shopContent.scss';
</style>
