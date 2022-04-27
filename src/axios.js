import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'

// 前缀URL，用于拼接完整的URL
axios.defaults.baseURL = "http://localhost:8081"

// 前置拦截,发送请求前，需要先执行该处代码
axios.interceptors.request.use(config => {
    console.log('======请求拦截器begin========')
    console.log(config)
    console.log('======请求拦截器end========')
  return config
})

// 接收到响应后，需先执行该处代码，然后继续执行then方法
axios.interceptors.response.use(response => {
    let res = response.data;

    console.log("======响应拦截器begin=========")
    console.log(res)
    // console.log("======响应拦截器=========")

    // 成功
    if (res.code === 200) {
      return response
    } else {
        // 弹窗显示错误信息
      Element.Message.error(response.data.msg, {duration: 3 * 1000})

      return Promise.reject(response.data.msg)
    }
  },
  error => {
    // 发送请求被拒绝时
    console.log('=======onReject=====')
    console.log(error)
    if(error.response.data) {
      error.message = error.response.data.msg
    }
    // 没有权限
    if(error.response.status === 401) {
      store.commit("REMOVE_INFO")
      router.push("/login")
    }

    Element.Message.error(error.message, {duration: 3 * 1000})
    return Promise.reject(error)
  }
)