<template>
  <div class="wrapper">
    <div class="search">
      <div
        class="search__back__icon iconfont"
        @click="handleBack"
      >
        &#xe6db;
      </div>
      <div class="search__content">
        <div class="search__content__icon iconfont">&#xe7da;</div>
        <input
          v-model="searchText"
          class="search__content__input"
          type="text"
          placeholder="请输入商品名称搜索"
        >
      </div>
    </div>
    <shop-info
      hide-border
      :shop-info="shopInfo"
    />
    <shop-content :shop-name="shopInfo.name" />
    <shop-cart />
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, toRefs } from 'vue'
import { get } from '@/utils/request'
import ShopInfo from '@/components/ShopInfo'
import ShopCart from './components/ShopCart'
import ShopContent from './components/ShopContent'

// 获取商家详情信息
const shopInfoEffect = () => {
  const searchText = ref('')
  const route = useRoute()
  const data = reactive({ shopInfo: {} })

  const getShopInfo = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.shopInfo = result.data
    }
  }
  const { shopInfo } = toRefs(data)
  return { searchText, shopInfo, getShopInfo }
}

const shopBackEffect = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return { handleBack }
}

export default {
  name: 'Shop',
  components: { ShopInfo, ShopCart, ShopContent },
  setup () {
    const { searchText, shopInfo, getShopInfo } = shopInfoEffect()
    const { handleBack } = shopBackEffect()
    getShopInfo()
    return { searchText, shopInfo, handleBack }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/mixins.scss';
  @import '~@/style/variables.scss';
  .wrapper {
    margin-top: .16rem;
    padding: 0 .18rem;
    .search {
      @include flex-align-center;
      &__back__icon {
        font-size: .21rem;
        color: #B6B6B6;
      }
      &__content {
        @include flex-align-center;
        margin-left: .1rem;
        padding: 0 .16rem;
        flex: 1;
        height: .32rem;
        background: $default-bg-color;
        border-radius: .16rem;
        &__icon {
          color: #B7B7B7;
        }
        &__input {
          margin-left: .08rem;
          outline: none;
          border: none;
          width: 100%;
          line-height: .32rem;
          background: $default-bg-color;
          &::placeholder {
            color: $main-text-color;
          }
        }
      }
    }
    ::v-deep .shop__info {
      margin-top: .16rem;
    }
  }
</style>
