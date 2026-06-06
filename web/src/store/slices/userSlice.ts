// 用户信息状态
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  userInfo: {
    id?: number
    nickName?: string
    email?: string
    url?: string
    avatarImg?: string
  }
}

const initialState: UserState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserState['userInfo']>) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    clearUserInfo: (state) => {
      state.userInfo = {}
      localStorage.removeItem('userInfo')
    },
  },
})

export const { setUserInfo, clearUserInfo } = userSlice.actions
export default userSlice.reducer
