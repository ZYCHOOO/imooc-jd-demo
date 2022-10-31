<template>
  <div class="address__header">
    <div
      class="address__header__icon iconfont"
      @click="handleBack"
    >
      &#xe6db;
    </div>
    <div class="address__header__title">{{ title }}</div>
    <div
      class="address__header__btn"
      @click="handleOperate"
    >
      {{ text }}
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

const addressHeaderEffect = (ctx) => {
  const router = useRouter()
  const handleBack = () => { router.back() }
  const handleOperate = () => { ctx.emit('handleOperate') }
  return { handleBack, handleOperate }
}

export default {
  name: 'AddressHeader',
  props: {
    title: { type: String, default: '' },
    text: { type: String, default: '' }
  },
  setup (props, ctx) {
    const { handleBack, handleOperate } = addressHeaderEffect(ctx)
    return { handleBack, handleOperate }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/mixins.scss';
  @import '~@/style/variables.scss';
  .address__header {
    @include flex-center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: .44rem;
    background: $light-color;
    color: $main-text-color;
    z-index: 9;
    &__icon {
      position: absolute;
      left: .18rem;
      font-size: .16rem;
      color: $light-text-color;
    }
    &__title {
      font-size: .16rem;
    }
    &__btn {
      position: absolute;
      right: .18rem;
      font-size: .14rem;
    }
  }
</style>
