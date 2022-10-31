<template>
  <div class="edit__address">
    <address-header
      title="编辑收货地址"
      text="保存"
      @handle-operate="saveAddress"
    />
    <div class="edit__address__content">
      <div class="edit__address__item">
        <div class="edit__address__title">所在城市：</div>
        <input v-model="addressForm.city" class="edit__address__input" type="text" placeholder="如北京市">
      </div>
      <div class="edit__address__item">
        <div class="edit__address__title">小区/大厦/学校：</div>
        <input v-model="addressForm.apartment" class="edit__address__input" type="text" placeholder="如理工大学国防科技园">
      </div>
      <div class="edit__address__item">
        <div class="edit__address__title">楼号-门牌号：</div>
        <input v-model="addressForm.number" class="edit__address__input" type="text" placeholder="A号楼B层">
      </div>
      <div class="edit__address__item">
        <div class="edit__address__title">收货人：</div>
        <input v-model="addressForm.receiver" class="edit__address__input" type="text" placeholder="请填写收货人的姓名">
      </div>
      <div class="edit__address__item">
        <div class="edit__address__title">联系电话：</div>
        <input v-model="addressForm.mobile" class="edit__address__input" type="text" placeholder="请填写收货手机号">
      </div>
    </div>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { toRefs, reactive, defineAsyncComponent } from 'vue'
import { commonAddressEffect } from '@/effects/addressEffect'

const editAddessEffect = (index, addressList) => {
  const store = useStore()
  const router = useRouter()
  const data = reactive({ addressForm: {} })
  const setAddressForm = () => {
    data.addressForm = addressList[index]
  }
  const { addressForm } = toRefs(data)
  const saveAddress = async () => {
    await store.commit('addressModule/editAddressList', { index, addressForm })
    router.push({ name: 'Address' })
  }
  return { addressForm, setAddressForm, saveAddress }
}

export default {
  name: 'EditAddress',
  components: {
    AddressHeader: defineAsyncComponent(() => import('./components/AddressHeader'))
  },
  setup () {
    const route = useRoute()
    const { index } = route.query
    const { addressList } = commonAddressEffect()
    const { addressForm, setAddressForm, saveAddress } = editAddessEffect(index, addressList)
    setAddressForm()
    return { addressForm, saveAddress }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/mixins.scss';
  @import '~@/style/variables.scss';
  .edit__address {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: $default-bg-color;
    overflow-y: auto;
    &__content {
      margin-top: .6rem;
      padding: 0 .18rem;
      background: $light-color;
    }
    &__item {
      @include flex-align-center;
      height: .44rem;
      font-size: .14rem;
      + .edit__address__item {
        border-top: .01rem solid $main-border-color;
      }
    }
    &__title {
      color: $main-text-color;
    }
    &__input {
      flex: 1;
      line-height: .32rem;
      outline: none;
      border: none;
      &::placeholder {
        color: $light-text-color;
      }
    }
  }
</style>
