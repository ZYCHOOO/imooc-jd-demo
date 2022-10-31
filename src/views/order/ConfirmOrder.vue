<template>
  <div class="confirm__order">
    <div class="confirm__order__header">
      <div class="header__icon iconfont" @click="handleBack">&#xe6db;</div>
      <div class="header__title">确认订单</div>
      <div class="confirm__order__address">
        <div class="address__title">收货地址</div>
        <div class="address__location">北京理工大学国防科技园2号楼10层</div>
        <div class="address__info">
          <span class="address__receiver">瑶妹（先生）</span>
          <div class="address__mobile">18911024266</div>
        </div>
        <div class="address__icon iconfont">&#xe601;</div>
      </div>
    </div>
    <cart-item
      :shop-name="shopName"
      :product-list="productList"
    />
    <div class="confirm__order__bottom">
      <div class="confirm__order__price">
        实付金额
        <span class="confirm__order__yen">&yen;{{ cartConfig.price }}</span>
      </div>
      <div
        class="confirm__order__btn"
        @click="handleSubmitOrder"
      >
        提交订单
      </div>
    </div>
    <div
      v-if="dialogConfig.backConfirmVisible || dialogConfig.paidConfirmVisible"
      class="mask"
    >
      <back-confirm-dialog
        v-if="dialogConfig.backConfirmVisible"
        @handle-cancel-order="handleCancelOrder"
        @handle-confirm-order="handleConfirmOrder"
      />
      <paid-confirm-dialog
        v-if="dialogConfig.paidConfirmVisible"
        @handle-close="handleClose"
      />
    </div>
  </div>
</template>

<script>
import { post } from '@/utils/request'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { reactive, defineAsyncComponent } from 'vue'
import { commonCartEffect } from '@/effects/cartEffect'

const orderEffect = (shopId) => {
  const store = useStore()
  const router = useRouter()
  const dialogConfig = reactive({
    backConfirmVisible: false,
    paidConfirmVisible: false
  })
  const { shopName, cartConfig, productList } = commonCartEffect(shopId)
  const handleBack = () => { dialogConfig.backConfirmVisible = true }
  const handleCancelOrder = () => {
    dialogConfig.backConfirmVisible = false
    router.back()
  }
  const handleConfirmOrder = () => {
    dialogConfig.backConfirmVisible = false
    handleSubmitOrder()
  }
  const handleSubmitOrder = async () => {
    const products = []
    for (const productId in productList.value) {
      const product = productList.value[productId]
      products.push({ id: product._id, num: product.count })
    }
    const result = await post('/api/order', {
      addressId: '1',
      isCanceld: false,
      shopName: shopName.value,
      shopId,
      products
    })
    if (result?.errno === 0) {
      store.commit('cartModule/clearCartData', shopId)
      dialogConfig.paidConfirmVisible = true
    }
  }
  const handleClose = () => {
    dialogConfig.paidConfirmVisible = false
    router.push({ name: 'Order' })
  }
  return {
    shopName,
    dialogConfig,
    productList,
    cartConfig,
    handleBack,
    handleCancelOrder,
    handleConfirmOrder,
    handleSubmitOrder,
    handleClose
  }
}

export default {
  name: 'ConfirmOrder',
  components: {
    CartItem: defineAsyncComponent(() => import('@/components/CartItem')),
    BackConfirmDialog: defineAsyncComponent(() => import('./components/BackConfirmDialog')),
    PaidConfirmDialog: defineAsyncComponent(() => import('./components/PaidConfirmDialog'))
  },
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { shopName, dialogConfig, productList, cartConfig, handleBack, handleCancelOrder, handleConfirmOrder, handleSubmitOrder, handleClose } = orderEffect(shopId)
    return {
      shopName,
      dialogConfig,
      productList,
      cartConfig,
      handleBack,
      handleCancelOrder,
      handleConfirmOrder,
      handleSubmitOrder,
      handleClose
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/style/views/confirmOrder.scss';
</style>
