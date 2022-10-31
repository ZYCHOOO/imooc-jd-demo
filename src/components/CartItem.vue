<template>
  <div class="cart__item">
    <div class="cart__item__name">{{ shopName }}</div>
    <div class="cart__item__content">
      <div
        v-for="productItem in productList"
        :key="productItem._id"
        class="cart__product"
      >
        <img :src="productItem.imgUrl" alt="" class="cart__product__img">
        <div class="cart__product__content">
          <div class="cart__product__name">{{ productItem.name }}</div>
          <div class="cart__product__price">
            <div class="cart__product__count">&yen;{{ productItem.price }} x {{ productItem.count }}</div>
            <div class="cart__product__total">&yen;{{ ( productItem.price * productItem.count).toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    shopName: { type: String, default: '' },
    productList: { type: Object, default: () => {} }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/mixins.scss';
  @import '~@/style/variables.scss';
  .cart__item {
    @include flex-column;
    margin: .16rem 0;
    padding: .16rem;
    border-radius: .04rem;
    background: $light-color;
    &__name {
      font-size: .16rem;
      font-weight: bold;
      color: $main-text-color;
    }
    &__content {
      margin-top: .16rem;
    }
    .cart__product {
      @include flex-align-center;
      height: .46rem;
      + .cart__product {
        margin-top: .16rem;
      }
      &__img {
        margin-right: .16rem;
        width: .46rem;
        height: .46rem;
      }
      &__name {
        font-size: .14rem;
        color: $main-text-color;
      }
      &__content {
        @include flex-column;
        flex: 1;
      }
      &__price {
        @include flex-row;
        margin-top: .06rem;
      }
      &__count {
        font-size: .12rem;
        color: $highlight-text-color;
      }
      &__total {
        margin-left: auto;
        font-size: .14rem;
        color: $main-text-color;
      }
    }
  }
</style>
