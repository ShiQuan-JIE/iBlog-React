// 登录页
import { useState } from 'react'
import { Card, Form, Input, Button, message, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import http from '@/api/http'
import { useAppDispatch } from '@/store'
import { loginSuccess } from '@/store/slices/authSlice'
import type { ILoginPayload, ILoginResponse } from '@/types'

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm<ILoginPayload>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // 登录
  const handleLogin = async () => {
    const values = await form.validateFields()
    setLoading(true)
    try {
      const res = await http.post<ILoginResponse>('/login', values)
      dispatch(loginSuccess(res.data))
      message.success('登录成功')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  // 注册（首次部署时使用，完事注释）
  const handleRegister = async () => {
    const values = await form.validateFields()
    setLoading(true)
    try {
      await http.post('/register', values)
      message.success('注册成功，请登录')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', alignItems: 'center' }}>
      <Card title="请先登录" style={{ width: 420, margin: '0 auto' }}>
        <Form form={form} labelCol={{ span: 5 }} style={{ marginTop: 20 }}>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" loading={loading} onClick={handleLogin}>
                登录
              </Button>
              <Button danger loading={loading} onClick={handleRegister}>
                注册
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
