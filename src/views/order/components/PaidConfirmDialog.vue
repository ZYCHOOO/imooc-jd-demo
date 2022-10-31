<template>
  <div class="paid__confirm__dialog">
    <div class="paid__confirm__dialog__success iconfont">&#xe72e;</div>
    <div class="paid__confirm__dialog__text">支付成功，等待配送</div>
    <div
      class="paid__confirm__dialog__close iconfont"
      @click="handleClose"
    >
      &#xe646;
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaidConfirmDialog',
  setup (props, ctx) {
    const handleClose = () => {
      ctx.emit('handleClose')
    }
    return { handleClose }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/mixins.scss';
  @import '~@/style/variables.scss';
  .paid__confirm__dialog {
    @include flex-column;
    @include flex-center;
    position: absolute;
    left: 50%;
    top: 50%;
    padding: .42rem 0 .32rem 0;
    width: 3.01rem;
    border-radius: .04rem;
    background: $light-color;
    transform: translate(-50%, -50%);
    &__success {
      font-size: .32rem;
      color: $deep-text-color;
    }
    &__text {
      margin-top: .24rem;
      font-size: .18rem;
      color: $deep-text-color;
    }
    &__close {
      position: absolute;
      right: .12rem;
      top: .12rem;
      font-size: .14rem;
      color: $medium-text-color;
    }
  }
</style>
