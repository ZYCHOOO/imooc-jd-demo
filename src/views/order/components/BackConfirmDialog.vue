<template>
  <div class="back__confirm__dialog">
    <div class="back__confirm__dialog__title">确定要离开收银台？</div>
    <div class="back__confirm__dialog__text">请尽快完成支付，否则将被取消</div>
    <div class="back__confirm__dialog__btns">
      <div
        class="back__confirm__dialog__btn back__confirm__dialog__btn--cancel"
        @click="handleCancelOrder"
      >
        取消订单
      </div>
      <div
        class="back__confirm__dialog__btn back__confirm__dialog__btn--confirm"
        @click="handleConfirmOrder"
      >
        确认支付
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackConfirmDialog',
  setup (props, ctx) {
    const handleCancelOrder = () => {
      ctx.emit('handleCancelOrder')
    }
    const handleConfirmOrder = () => {
      ctx.emit('handleConfirmOrder')
    }
    return { handleCancelOrder, handleConfirmOrder }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/mixins.scss';
  @import '~@/style/variables.scss';
  .back__confirm__dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    padding: .24rem 0;
    width: 3.01rem;
    text-align: center;
    border-radius: .04rem;
    background: $light-color;
    transform: translate(-50%, -50%);
    &__title {
      font-size: .18rem;
      font-weight: bold;
      color: $main-text-color;
    }
    &__text {
      margin-top: .08rem;
      font-size: .14rem;
      color: $medium-text-color;
    }
    &__btns {
      @include flex-center;
      margin-top: .24rem;
    }
    &__btn {
      @include flex-center;
      width: .8rem;
      height: .32rem;
      font-size: .14rem;
      border-radius: .16rem;
      border: .01rem solid $primary-btn-color;
      &--confirm {
        background: $primary-btn-color;
        color: $light-color;
      }
      &--cancel {
        margin-right: .24rem;
        background: $light-color;
        color: $primary-btn-color;
      }
    }
  }
</style>
