import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//全局共享数据
export default new Vuex.Store({
  state: {
    token: '',
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  mutations: {
    // set
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token", token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      state.userInfo = {}
      localStorage.setItem("token", '')
      sessionStorage.setItem("userInfo", JSON.stringify(''))
    }

  },
  getters: {
    // get
    // getUser: state => {
    //   return state.userInfo
    // },
    getUser(state) {
      return state.userInfo
    }

  },
  actions: {
  },
  modules: {
  }
})
