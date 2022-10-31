<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt="">
    <div class="wrapper__input">
      <input
        v-model="registerForm.username"
        class="wrapper__input__content"
        placeholder="请输入用户名"
      >
    </div>
    <div class="wrapper__input">
      <input
        v-model="registerForm.password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        type="password"
      >
    </div>
    <div class="wrapper__input">
      <input
        v-model="registerForm.confirmPassword"
        class="wrapper__input__content"
        placeholder="确认密码"
        type="password"
      >
    </div>
    <div
      class="wrapper__register-btn"
      @click="registerValidate"
    >
      注册
    </div>
    <div class="wrapper__register-options">
      <div
        class="wrapper__login-option"
        @click="handleLogin"
      >
        已有账号去登陆
      </div>
    </div>
    <Toast
      v-if="toastConfig.showToast"
      :message="toastConfig.message"
    />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { post } from '@/utils/request'
import Toast, { toastEffect } from '@/components/Toast'

export default {
  name: 'Register',
  components: { Toast },
  setup () {
    const registerForm = reactive({
      username: '',
      password: '',
      confirmPassword: ''
    })
    const router = useRouter()
    const { toastConfig, toastMessage } = toastEffect()

    const registerValidate = () => {
      const { password, confirmPassword } = registerForm
      if (password !== confirmPassword) {
        toastMessage('两次密码不一致，请重新输入！')
        return false
      }
      handleRegister()
    }
    const handleRegister = async () => {
      try {
        const result = await post('/api/user/register', {
          username: registerForm.username,
          password: registerForm.password
        })
        if (result?.errno === 0) {
          router.push({ name: 'Login' })
        } else {
          toastMessage('注册失败！')
        }
      } catch (e) {
        toastMessage('请求失败！')
      }
    }
    const handleLogin = () => {
      router.push({ name: 'Login' })
    }
    return {
      toastConfig,
      toastMessage,
      registerForm,
      handleRegister,
      registerValidate,
      handleLogin
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/mixins.scss';
  @import '~@/style/variables.scss';
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
    &__register {
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
