<template>
  <div class="mine">
    <div class="mine__header">
      <div class="mine__header__arc">
        <div class="mine__header__arcbg" />
      </div>
      <div class="mine__content">
        <div class="mine__content__info">
          <div class="mine__content__user">{{ userInfo.username }}</div>
          <div class="mine__content__id">ID:{{ userInfo._id }}</div>
        </div>
        <img
          class="mine__content__avatar"
          src="@/assets/images/avatar.jpeg"
        />
        <div class="address__item" @click="handleAddressClick">
          <div class="address__item__title">我的地址</div>
          <div class="address__item__icon iconfont">&#xe601;</div>
        </div>
      </div>
    </div>
    <div class="mine__logout" @click="handleLogout">退出登陆</div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '@/utils/request'

const useUserEffect = () => {
  const userInfo = reactive({ _id: '', username: '' })
  const getUserInfo = async () => {
    const result = await get('/api/user/info')
    if (result?.errno === 0 && result?.data) {
      const { _id, username } = result.data
      userInfo._id = _id || ''
      userInfo.username = username || ''
      userInfo._id = '06070202'
      userInfo.username = 'ZYCHOOO'
    }
  }
  getUserInfo()
  return userInfo
}

export default {
  name: 'Mine',
  setup () {
    const router = useRouter()
    const handleLogout = () => {
      localStorage.removeItem('isLogin')
      router.replace({ name: 'Login' })
    }
    const handleAddressClick = () => {
      router.push({ name: 'Address' })
    }
    const userInfo = useUserEffect()
    return { handleLogout, handleAddressClick, userInfo }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/views/mine.scss';
</style>
