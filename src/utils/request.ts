import axios from 'axios'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000000
})

// request interceptor
service.interceptors.request.use(
  async (config: any) => {
    // 下载接口的拦截
    config.cancelToken = new axios.CancelToken((r: any) => {
      config.url === '/v3/record/download/record/file' && ((window as any).cancelRequest = r)
    })

    const { contentType = false } = config
    const token = window.sessionStorage.getItem('token')
    config.headers['Content-Type'] = contentType || 'application/json'
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  error => Promise.reject(error)
)

// response interceptor
service.interceptors.response.use(
  async response => {
    const res = response.data
    if (!res.code) {
      if (res.errors[0].indexOf('Token解析异常') !== -1) {
        try {
        } finally {

        }
        
        setTimeout(() => {
          router.push('/login')
          window.sessionStorage.clear()
        }, 2000)
      } else {
        try {
         
        } finally {

        }
        
      }
      return Promise.reject(new Error(res.errors[0]))
    } else if (res.code && res.code !== 200) {
      try {
       
      } finally {

      }
      
      if (res.msg == '用户已经登录' && res.code == 400) {
        window.sessionStorage.clear()
        router.push('/login')
      } else {
        return Promise.reject(new Error(res.msg || '加载失败！'))
      }
    } else {
      return res
    }
  },
  error => {
    try {
     
    } finally {

    }
    const { data, status, statusText } = error.response
    
    return Promise.reject(error)
  }
)

export default service
