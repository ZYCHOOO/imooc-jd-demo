<template>
  <div class="add__address">
    <address-header
      title="新建收货地址"
      text="保存"
      @handle-operate="addAddress"
    />
    <div class="add__address__content">
      <div class="add__address__item">
        <div class="add__address__title">所在城市：</div>
        <input v-model="addressForm.city" class="add__address__input" type="text" placeholder="如北京市">
      </div>
      <div class="add__address__item">
        <div class="add__address__title">小区/大厦/学校：</div>
        <input v-model="addressForm.apartment" class="add__address__input" type="text" placeholder="如理工大学国防科技园">
      </div>
      <div class="add__address__item">
        <div class="add__address__title">楼号-门牌号：</div>
        <input v-model="addressForm.number" class="add__address__input" type="text" placeholder="A号楼B层">
      </div>
      <div class="add__address__item">
        <div class="add__address__title">收货人：</div>
        <input v-model="addressForm.receiver" class="add__address__input" type="text" placeholder="请填写收货人的姓名">
      </div>
      <div class="add__address__item">
        <div class="add__address__title">联系电话：</div>
        <input v-model="addressForm.mobile" class="add__address__input" type="text" placeholder="请填写收货手机号">
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { reactive, defineAsyncComponent } from 'vue'

const addAddressEffect = () => {
  const store = useStore()
  const router = useRouter()
  const addressForm = reactive({
    city: '',
    apartment: '',
    number: '',
    receiver: '',
    mobile: ''
  })
  const addAddress = async () => {
    await store.commit('addressModule/addAddressList', addressForm)
    router.push({ name: 'Address' })
  }
  return { addressForm, addAddress }
}

export default {
  name: 'AddAddress',
  components: {
    AddressHeader: defineAsyncComponent(() => import('./components/AddressHeader'))
  },
  setup () {
    const { addressForm, addAddress } = addAddressEffect()
    return { addressForm, addAddress }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/mixins.scss';
  @import '~@/style/variables.scss';
  .add__address {
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
      + .add__address__item {
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
