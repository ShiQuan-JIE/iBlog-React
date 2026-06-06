// HTTP 请求封装（基于 axios）
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/admin/api',
  timeout: 20000,
})

// ============ 请求拦截器 ============
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// ============ 响应拦截器 ============
let navigate: ReturnType<typeof useNavigate> | null = null

// 注入 navigate（在 App 初始化时调用一次）
export const injectNavigate = (nav: ReturnType<typeof useNavigate>) => {
  navigate = nav
}

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string }>) => {
    const msg = error.response?.data?.message || '网络错误'
    message.error(msg)

    if (error.response?.status === 401 && navigate) {
      navigate('/login')
    }
    return Promise.reject(error)
  }
)

export default http

// ============ 通用工具方法 ============

/** 获取带 token 的请求头（用于文件上传等非 axios 场景） */
export const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
})

/** 文件上传地址 */
export const getUploadUrl = () => {
  const baseURL = http.defaults.baseURL || ''
  return `${baseURL.replace(/\/admin\/api\/?$/, '')}/admin/api/upload`
}
