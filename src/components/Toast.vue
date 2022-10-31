<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { setTimeout } from 'timers'

export default {
  name: 'Toast',
  props: {
    message: { type: String }
  }
}
export const toastEffect = () => {
  const toastConfig = reactive({
    showToast: false,
    message: ''
  })
  const toastMessage = (message) => {
    toastConfig.showToast = true
    toastConfig.message = message
    setTimeout(() => {
      toastConfig.showToast = false
    }, 3000)
  }
  const { showToast, message } = toRefs(toastConfig)
  return {
    showToast,
    message,
    toastMessage
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/variables.scss';
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 0 .1rem;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .35);
    border-radius: .05rem;
    color: $light-color;
  }
</style>
