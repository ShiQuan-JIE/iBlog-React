// 认证状态切片
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string
  username: string
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
  username: localStorage.getItem('username') || '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 登录成功
    loginSuccess: (state, action: PayloadAction<{ token: string; username: string }>) => {
      state.token = action.payload.token
      state.username = action.payload.username
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('username', action.payload.username)
    },
    // 退出登录
    logout: (state) => {
      state.token = ''
      state.username = ''
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
