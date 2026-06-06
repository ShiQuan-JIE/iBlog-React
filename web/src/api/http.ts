// HTTP 请求封装
import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/web/api',
  timeout: 20000,
})

export default http
