<template>
  <div class="address__item">
    <div class="address__item__header">
      <div class="address__item__name">{{ receiver }}</div>
      <div class="address__item__mobile">{{ mobile }}</div>
    </div>
    <div class="address__item__address" v-html="location" />
    <div class="address__item__icon iconfont">&#xe601;</div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'AddressItem',
  props: {
    city: { type: String, default: '' },
    apartment: { type: String, default: '' },
    number: { type: String, default: '' },
    receiver: { type: String, default: '' },
    mobile: { type: String, default: '' }
  },
  setup (props, ctx) {
    const location = computed(() => {
      return `${props.city}&nbsp;${props.apartment}&nbsp;${props.number}`
    })
    return { location }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/mixins.scss';
  @import '~@/style/variables.scss';
  .address__item {
    @include flex-column;
    position: relative;
    padding: .18rem .16rem;
    font-size: .14rem;
    border-radius: .04rem;
    background: $light-color;
    &__header {
      @include flex-row;
      font-size: .14rem;
      color: $light-text-color;
    }
    &__mobile {
      margin-left: .66rem;
    }
    &__address {
      margin-top: .08rem;
      color: $main-text-color;
    }
    &__icon {
      position: absolute;
      right: .16rem;
      top: 50%;
      font-size: .16rem;
      color: $light-text-color;
      transform: translateY(-50%);
    }
    + .address__item {
      margin-top: .16rem;
    }
  }
</style>
