import axios from 'axios'

const api = axios.create({
  baseURL: 'http://paggue.io/api/projeto'
})

export default api
