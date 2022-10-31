<template>
  <div class="demo">
    这是个demo
    <div class="demo__content">
      <div>{{ name }}</div>
      <div>{{ array }}</div>
      <div>{{ identity.nm }}</div>
      <div>{{ optionName }}</div>
      <div>{{ optionArray }}</div>
      <div>{{ optionItentity.name }}</div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import { setTimeout } from 'timers'
export default {
  name: 'Demo',
  setup () {
    const name = ref('zychooo')
    const identity = reactive({ nm: 'zychooo' })
    const array = reactive([1, 2, 3])
    const { nm } = toRefs(identity)
    setTimeout(() => {
      name.value = name.value.toUpperCase()
      nm.value = nm.value.toUpperCase()
      array[1] = 4
    }, 2000)
    return { name, identity, array }
  },
  data () {
    return {
      optionName: 'zychooo-option-api',
      optionArray: [11, 22, 33],
      optionItentity: {
        name: 'zychooo-option-api'
      }
    }
  },
  created () {
    setTimeout(() => {
      this.optionName = this.optionName.toUpperCase()
      this.optionItentity.name = this.optionItentity.name.toUpperCase()
      this.optionArray[1] = 44
    }, 2000)
  }

}
</script>

<style lang="scss" scoped>
  @import '~@/style/mixins.scss';
  @import '~@/style/variables.scss';
  .demo {
    padding: .1rem;
    &__content {
      margin-top: .1rem;
      border: .01rem solid $main-border-color;
      min-height: 1rem;
    }
  }
</style>
