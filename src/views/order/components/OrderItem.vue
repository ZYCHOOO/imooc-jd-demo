<template>
  <div class="order__item">
    <div class="order__item__header">
      <div class="order__item__shopname">{{ shopName }}</div>
      <div class="order__item__status">{{ isCanceled ? '已送达' : '已取消' }}</div>
    </div>
    <div class="order__item__content">
      <div class="order__item__products">
        <img
          v-for="(orderItem, i) in products"
          :key="i"
          :src="orderItem.product.img"
          class="order__item__product"
          alt=""
        >
      </div>
      <div class="order__item__info">
        <div class="order__item__price">&yen;{{ orderConfig.price }}</div>
        <div class="order__item__count">共{{ orderConfig.count }}件</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

const orderItemEffect = (productList) => {
  const orderConfig = computed(() => {
    // 商品总价、商品数量
    const orderConfig = { price: 0, count: 0 }
    productList.value.forEach(item => {
      const product = item.product
      orderConfig.count = orderConfig.count + product.sales
      orderConfig.price = orderConfig.price + product.sales * product.price
    })
    orderConfig.price = orderConfig.price.toFixed(2)
    return orderConfig
  })
  return { orderConfig }
}

export default {
  name: 'OrderItem',
  props: {
    shopName: { type: String, default: '' },
    isCanceled: { type: Boolean, default: true },
    // [{ orderSales , products: { img, name, price, sales } }]
    products: { type: Array, defalut: () => [] }
  },
  setup (props, ctx) {
    const productList = computed(() => { return props.products })
    const { orderConfig } = orderItemEffect(productList)
    return { orderConfig }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/mixins.scss';
  @import '~@/style/variables.scss';
  .order__item {
    @include flex-column;
    padding: .16rem;
    border-radius: .04rem;
    background: $light-color;
    &__header, &__content {
      @include flex-align-center;
    }
    &__status, &__info {
      margin-left: auto;
    }
    &__products {
      @include flex-row;
      max-width: 70%;
      overflow-x: hidden;
    }
    &__product {
      width: .4rem;
      height: .4rem;
      + .order__item__product {
        margin-left: .12rem;
      }
    }
    &__content {
      margin-top: .16rem;
    }
    &__shopname {
      font-size: .16rem;
      font-weight: bold;
      color: $main-text-color;
    }
    &__status {
      font-size: .14rem;
      color: $light-text-color;
    }
    &__info {
      @include flex-column;
      text-align: right;
    }
    &__price {
      font-size: .14rem;
      color: $highlight-text-color;
    }
    &__count {
      margin-top: .04rem;
      font-size: .12rem;
      color: $main-text-color;
    }
  }
</style>
