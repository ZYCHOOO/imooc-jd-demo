<template>
  <div class="app">
    <router-view />
    <docker v-if="dockerShow" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed, defineAsyncComponent } from 'vue'

// 坞展示逻辑
const dockerShowEffect = () => {
  const dockerShow = computed(() => {
    const { name } = useRoute()
    const mainPageNames = ['Home', 'Cart', 'Order', 'Mine']
    return mainPageNames.includes(name)
  })
  return { dockerShow }
}

export default {
  name: 'App',
  components: {
    Docker: defineAsyncComponent(() => import('@/components/Docker')) // vue3使用箭头函数导入异步组件
  },
  setup () {
    const { dockerShow } = dockerShowEffect()
    return { dockerShow }
  }
}
</script>

<style lang="scss" scoped>
  .app {
    padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
        margin-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    margin-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  }
</style>
