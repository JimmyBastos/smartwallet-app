import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://paggue.io/api/projeto'
  baseURL: 'http://10.0.2.2:3333'
})

export const setAutorizationToken = (token) => {
  api.interceptors.request.use(function (config) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete config.headers.Authorization
    }
    return config
  })
}

export default api
