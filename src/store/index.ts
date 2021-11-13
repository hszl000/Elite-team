import { createStore } from 'vuex'

export default createStore({
  state: {
    userList:JSON.parse(sessionStorage.getItem('user')) || []
  },
  mutations: {
    user(state,val){
      state.userList = val
      // 本地存储所有数据
      sessionStorage.setItem('user',JSON.stringify(val))
    }
  },
  actions: {}
})