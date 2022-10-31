<template>
  <div class="docker">
    <div
      v-for="dockerItem in dockerList"
      :key="dockerItem.id"
      :class="{ 'docker__item': true, 'docker__item--active': activeId === dockerItem.id }"
    >
      <div class="iconfont" v-html="dockerItem.icon" />
      <span class="docker__title">{{ dockerItem.title }}</span>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  name: 'Docker',
  setup () {
    // const activeId = 1
    // const dockerList = [
    //   { id: 1, icon: '&#xe68d;', title: '首页' },
    //   { id: 2, icon: '&#xe63b;', title: '购物车' },
    //   { id: 3, icon: '&#xe643;', title: '订单' },
    //   { id: 4, icon: '&#xe679;', title: '我的' }
    // ]
    const activeId = ref(1)
    const dockerList = reactive([
      { id: 1, icon: '&#xe68d;', title: '首页' },
      { id: 2, icon: '&#xe63b;', title: '购物车' },
      { id: 3, icon: '&#xe643;', title: '订单' },
      { id: 4, icon: '&#xe679;', title: '我的' }
    ])
    return { dockerList, activeId }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/variables.scss';
  @import '~@/style/mixins.scss';
  .docker {
    position: absolute;
    left: 0;
    // bottom: 0;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    box-sizing: border-box;
    // padding: 0 .18rem;
    background: black;
    display: flex;
    width: 100%;
    // height: 0.49rem;
    border-top: .01rem solid $main-border-color;
    padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    margin-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    margin-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    &__item {
      flex: 1;
      text-align: center;
      color: $main-text-color;
      .iconfont {
        margin: .07rem 0 .02rem 0;
        font-size: .18rem;
      }
      &--active {
        // color: #1FA4FC;
        color: red;
      }
    }
    &__title {
      font-size: .1rem;
      // font-size: 20px;
      // transform: scale(.5, .5);
      // transform-origin: center top;
    }
  }
</style>
