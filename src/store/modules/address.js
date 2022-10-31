const setAddressList = (state) => {
  const { addressList } = state
  const addressListString = JSON.stringify(addressList)
  localStorage.addressList = addressListString
}

const getAddressList = () => {
  try {
    return JSON.parse(localStorage.addressList)
  } catch (e) {
    return []
  }
}

export default {
  namespaced: true,
  state: {
    addressList: getAddressList()
  },
  mutations: {
    addAddressList (state, addressForm) {
      const addressList = state.addressList
      state.addressList = [...addressList, addressForm]
      setAddressList(state)
    },
    editAddressList (state, payload) {
      const { index, addressForm } = payload
      const addressList = state.addressList
      addressList[index] = addressForm.value
      state.addressList = addressList
      setAddressList(state)
    }
  }
}
