<template>
  <div class="docker">
    <router-link
      v-for="dockerItem in dockerList"
      :key="dockerItem.id"
      :to="dockerItem.to"
      :class="{ 'docker__item': true, 'docker__item--active': currentName === dockerItem.name }"
    >
      <div class="iconfont" v-html="getDockerIcon(dockerItem)" />
      <span class="docker__title">{{ dockerItem.title }}</span>
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { DOCKER_LIST } from '@/utils/enums'

const dockerEffect = () => {
  const route = useRoute()
  const dockerList = DOCKER_LIST
  const currentName = computed(() => {
    return route.name
  })
  const getDockerIcon = (currentDockerItem) => {
    const currentName = route.name
    return currentDockerItem.name === currentName
      ? currentDockerItem.activeIcon : currentDockerItem.icon
  }
  return { currentName, dockerList, getDockerIcon }
}

export default {
  name: 'Docker',
  setup () {
    const { currentName, dockerList, getDockerIcon } = dockerEffect()
    return { currentName, dockerList, getDockerIcon }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/variables.scss';
  @import '~@/style/mixins.scss';
  .docker {
    position: absolute;
    left: 0;
    bottom: 0;
        bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    box-sizing: border-box;
    padding: 0 .18rem;
    display: flex;
    width: 100%;
    height: 0.49rem;
    border-top: .01rem solid $main-border-color;
    // padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    // padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    // margin-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    // margin-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    &__item {
      flex: 1;
      text-align: center;
      color: $main-text-color;
      .iconfont {
        margin: .07rem 0 .02rem 0;
        font-size: .18rem;
      }
      &--active {
        color: #1FA4FC;
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
