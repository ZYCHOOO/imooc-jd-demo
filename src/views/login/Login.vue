<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt="">
    <div class="wrapper__input">
      <input
        v-model="username"
        class="wrapper__input__content"
        placeholder="请输入用户名"
      >
    </div>
    <div class="wrapper__input">
      <input
        v-model="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        type="password"
      >
    </div>
    <div
      class="wrapper__login-btn"
      @click="handleLogin"
    >
      登陆
    </div>
    <div class="wrapper__login-options">
      <div
        class="wrapper__login-option"
        @click="handleRegister"
      >
        立即注册
      </div>
      <div class="wrapper__login-option">忘记密码</div>
    </div>
    <Toast
      v-if="showToast"
      :message="message"
    />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '@/utils/request'
import Toast, { toastEffect } from '@/components/Toast'

const loginEffect = (toastMessage) => {
  const loginForm = reactive({ username: '', password: '' })
  const { username, password } = toRefs(loginForm)
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const result = await post('/api/user/login', {
        username: 'username',
        password: 'password'
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        toastMessage('登陆失败！')
      }
    } catch (e) {
      toastMessage('请求失败！')
    }
  }

  return { username, password, handleLogin }
}

const registerEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegister }
}

export default {
  name: 'Login',
  components: { Toast },
  // 代码执行的流程
  setup () {
    const { showToast, message, toastMessage } = toastEffect()
    const { username, password, handleLogin } = loginEffect(toastMessage)
    const { handleRegister } = registerEffect()
    return {
      username,
      password,
      showToast,
      message,
      toastMessage,
      handleLogin,
      handleRegister
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    &__img {
      margin: 0 auto .4rem;
      display: block;
      width: .66rem;
      height: .66rem;
    }
    &__login {
      &-btn {
        @include flex-center;
        margin: .32rem .4rem .16rem;
        height: .48rem;
        border-radius: .04rem;
        background: $primary-btn-color;
        box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
        font-size: .16rem;
        color: $light-color;
      }
      &-options {
        @include flex-justify-center;
        margin: 0 .4rem;
        font-size: .14rem;
        color: #777;
      }
      &-option + &-option {
        @include flex-align-center;
        margin-left: .27rem;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: -.135rem;
          width: .01rem;
          height: .14rem;
          background: #777;
        }
      }
    }
    &__input {
      margin: 0 .4rem .16rem;
      padding: 0 .16rem;
      height: .48rem;
      background: #F9F9F9;
      border: .01rem solid rgba(0,0,0,0.10);
      border-radius: .06rem;
      &__content {
        line-height: .48rem;
        width: 100%;
        background: none;
        border: none;
        outline: none;
        color: #777;
        &::placeholder {
          color: #777;
        }
      }
    }
  }
</style>
