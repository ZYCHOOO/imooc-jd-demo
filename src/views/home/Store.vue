<template>
  <div class="store">
    <div class="store__title">附近店铺</div>
    <router-link
      :to="`/shop/${storeItem._id}`"
      v-for="storeItem in storeList"
      :key="storeItem._id"
    >
      <shop-info :shop-info="storeItem" />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '@/utils/request'
import ShopInfo from '@/components/ShopInfo'

const storeEffect = () => {
  const storeList = ref([])

  const getStoreList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      storeList.value = result.data
    }
  }
  return { storeList, getStoreList }
}

export default {
  name: 'Store',
  components: { ShopInfo },
  setup () {
    const { storeList, getStoreList } = storeEffect()
    getStoreList()
    return { storeList }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/variables.scss';
  .store {
    &__title {
      margin: .16rem 0 .02rem 0;
      font-size: .18rem;
      font-weight: bold;
      color: $main-text-color;
    }
  }
</style>
