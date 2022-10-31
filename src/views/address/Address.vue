<template>
  <div class="address">
    <address-header
      title="管理收货地址"
      text="新建"
      @handle-operate="addAddress"
    />
    <div class="address__content">
      <div class="address__content__header">我的收货地址</div>
      <address-item
        v-for="(addressItem, index) in addressList"
        :key="index"
        :city="addressItem.city"
        :apartment="addressItem.apartment"
        :number="addressItem.number"
        :receiver="addressItem.receiver"
        :mobile="addressItem.mobile"
        @click="handleEditAddress(index)"
      />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import { commonAddressEffect } from '@/effects/addressEffect'

const handleAddressEffect = () => {
  const router = useRouter()
  const addAddress = () => { router.push({ name: 'AddAddress' }) }
  const handleEditAddress = (index) => {
    router.push({
      name: 'EditAddress',
      query: { index }
    })
  }
  return { addAddress, handleEditAddress }
}

export default {
  name: 'Address',
  components: {
    AddressHeader: defineAsyncComponent(() => import('./components/AddressHeader')),
    AddressItem: defineAsyncComponent(() => import('./components/AddressItem'))
  },
  setup () {
    const { addressList } = commonAddressEffect()
    const { addAddress, handleEditAddress } = handleAddressEffect()
    return { addressList, addAddress, handleEditAddress }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/mixins.scss';
  @import '~@/style/variables.scss';
  .address {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 0 .18rem;
    background: $default-bg-color;
    overflow-y: auto;
    &__content {
      margin-top: .6rem;
      &__header {
        margin-bottom: .16rem;
        font-size: .14rem;
        color: $main-text-color;
      }
    }
  }
</style>
