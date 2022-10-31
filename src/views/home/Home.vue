<template>
  <div class="wrapper">
    <Header />
    <store />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: 'Home',
  components: {
    Header: defineAsyncComponent(() => import('./Header')), // vue3使用箭头函数导入异步组件
    Store: defineAsyncComponent(() => import('./Store')) // vue3使用箭头函数导入异步组件
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: .5rem;
    right: 0;
    padding: 0 .18rem;
    padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    margin-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    margin-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  }
</style>
