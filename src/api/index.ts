import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URl,
  headers: {

  },
})

// 请求拦截器
instance.interceptors.request.use(async (config) => {
  // router
  console.log(config)

  return config
})
// 响应拦截器
instance.interceptors.response.use((response) => {
  return response
})
