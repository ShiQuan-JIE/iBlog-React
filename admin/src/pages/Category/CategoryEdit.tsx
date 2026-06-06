// 分类编辑（新建/编辑）
import { useEffect, useState } from 'react'
import { Form, Input, Button, Card, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import http from '@/api/http'
import { createItem, updateItem, fetchDetail } from '@/api/crud'
import type { ICategory } from '@/types'

const CategoryEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form] = Form.useForm<ICategory>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      fetchDetail<ICategory>('categories', id).then((data) => form.setFieldsValue(data))
    }
  }, [id, form])

  const handleSubmit = async () => {
    const values = await form.validateFields()
    setLoading(true)
    try {
      if (id) {
        await updateItem('categories', id, values)
      } else {
        await createItem('categories', values)
      }
      message.success('保存成功')
      navigate('/categories/list')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title={id ? '编辑分类' : '新建分类'}>
      <Form form={form} labelCol={{ span: 4 }} onFinish={handleSubmit} style={{ maxWidth: 600 }}>
        <Form.Item label="分类名" name="name" rules={[{ required: true, message: '请输入分类名' }]}>
          <Input placeholder="请输入分类名" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CategoryEdit
