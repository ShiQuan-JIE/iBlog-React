// 管理员编辑
import { useEffect } from 'react'
import { Form, Input, Button, Card, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { createItem, updateItem, fetchDetail } from '@/api/crud'
import type { IAdminUser } from '@/types'

const AdminUserEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form] = Form.useForm<IAdminUser>()

  useEffect(() => {
    if (id) {
      fetchDetail<IAdminUser>('adminUsers', id).then((data) =>
        form.setFieldsValue({ username: data.username })
      )
    }
  }, [id, form])

  const handleSubmit = async () => {
    const values = await form.validateFields()
    if (id) {
      await updateItem('adminUsers', id, values)
    } else {
      await createItem('adminUsers', values)
    }
    message.success('保存成功')
    navigate('/admin_users/list')
  }

  return (
    <Card title={id ? '编辑管理员' : '新建管理员'}>
      <Form form={form} labelCol={{ span: 4 }} onFinish={handleSubmit} style={{ maxWidth: 500 }}>
        <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {!id && (
          <Form.Item label="密码" name="password" rules={[{ required: true, min: 6 }]}>
            <Input.Password />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default AdminUserEdit
