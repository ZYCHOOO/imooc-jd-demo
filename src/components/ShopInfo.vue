<template>
  <div
    class="shop__info">
    <img :src="shopInfo.imgUrl" alt="" class="shop__info__img">
    <div
      :class="{'shop__info__content': true, 'shop__info__content--bordered': !hideBorder }"
    >
      <div class="shop__info__title">{{ shopInfo.name }}</div>
      <div class="shop__info__tags">
        <div class="shop__info__tag">月售{{ shopInfo.sales }}</div>
        <div class="shop__info__tag">起送¥{{ shopInfo.expressLimit }}</div>
        <div class="shop__info__tag">基础运费¥{{ shopInfo.expressPrice }}</div>
      </div>
      <div class="shop__info__highlight">{{ shopInfo.slogan }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: {
    shopInfo: { type: Object, default: () => {} },
    hideBorder: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/variables.scss';
  .shop__info {
    margin-top: .12rem;
    display: flex;
    &__img {
      width: .56rem;
      height: .56rem;
    }
    &__content {
      flex: 1;
      margin-left: .16rem;
      &--bordered {
        border-bottom: .01rem solid $main-border-color;
      }
    }
    &__title {
      font-size: .16rem;
      color: $main-text-color;
    }
    &__tags {
      margin-top: .08rem;
      display: flex;
      font-size: .13rem;
      color: $main-text-color;
    }
    &__tag + &__tag {
      margin-left: .16rem;
    }
    &__highlight {
      margin: .08rem 0 .12rem 0;
      font-size: .13rem;
      color: $highlight-text-color;
    }
  }
</style>
