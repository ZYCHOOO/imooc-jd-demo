<template>
  <div class="order">
    <div class="order__header">我的订单</div>
    <div class="order__content">
      <order-item
        v-for="orderItem in orderList"
        :key="orderItem.shopId"
        :shop-name="orderItem.shopName"
        :is-canceled="orderItem.isCanceled"
        :products="orderItem.products"
      />
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/request'
import { toRefs, reactive, defineAsyncComponent } from 'vue'

const orderEffect = () => {
  const data = reactive({ orderList: [] })
  const getOrderList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      data.orderList = result.data
    }
  }
  const { orderList } = toRefs(data)
  return { orderList, getOrderList }
}

export default {
  name: 'Order',
  components: {
    OrderItem: defineAsyncComponent(() => import('./components/OrderItem'))
  },
  setup () {
    const { orderList, getOrderList } = orderEffect()
    getOrderList()
    return { orderList }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/mixins.scss';
  @import '~@/style/variables.scss';
  .order {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    padding: 0 .18rem;
    bottom: .49rem;
    background: $default-bg-color;
    &__header {
      @include flex-center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: .44rem;
      font-size: .16rem;
      background: $light-color;
      color: $main-text-color;
    }
    &__content {
      margin-top: .6rem;
    }
  }
</style>
