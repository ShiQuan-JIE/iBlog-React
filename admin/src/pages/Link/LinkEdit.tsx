// 友链编辑
import { useEffect, useState } from 'react'
import { Form, Input, Button, Card, message, Upload, Image } from 'antd'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { createItem, updateItem, fetchDetail } from '@/api/crud'
import { getAuthHeaders, getUploadUrl } from '@/api/http'
import type { ILink } from '@/types'

const LinkEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form] = Form.useForm<ILink>()
  const [loading, setLoading] = useState(false)
  const [iconUrl, setIconUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (id) {
      fetchDetail<ILink>('links', id).then((data) => {
        form.setFieldsValue(data)
        setIconUrl(data.icon || '')
      })
    }
  }, [id, form])

  const handleSubmit = async () => {
    const values = await form.validateFields()
    setLoading(true)
    try {
      const payload = { ...values, icon: iconUrl }
      if (id) await updateItem('links', id, payload)
      else await createItem('links', payload)
      message.success('保存成功')
      navigate('/links/list')
    } finally {
      setLoading(false)
    }
  }

  const uploadProps = {
    name: 'file',
    action: getUploadUrl(),
    headers: getAuthHeaders(),
    showUploadList: false,
    beforeUpload: () => {
      setUploading(true)
      return true
    },
    onSuccess: (res: any) => {
      setIconUrl(res.url)
      setUploading(false)
    },
    onError: () => setUploading(false),
  }

  return (
    <Card title={id ? '编辑友链' : '新建友链'}>
      <Form form={form} labelCol={{ span: 4 }} onFinish={handleSubmit} style={{ maxWidth: 600 }}>
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="链接" name="site" rules={[{ required: true, type: 'url' }]}>
          <Input placeholder="https://" />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="图标">
          <Upload {...uploadProps}>
            {iconUrl ? (
              <Image src={iconUrl} width={64} height={64} style={{ objectFit: 'cover' }} />
            ) : (
              <div style={{ width: 64, height: 64, border: '1px dashed #d9d9d9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {uploading ? <LoadingOutlined /> : <PlusOutlined />}
              </div>
            )}
          </Upload>
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

export default LinkEdit
