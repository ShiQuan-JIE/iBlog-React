// 文章编辑（新建/编辑）
import { useEffect, useState } from 'react'
import { Form, Input, Select, Button, Card, message, Upload, Image as AntImage } from 'antd'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import http, { getAuthHeaders, getUploadUrl } from '@/api/http'
import { createItem, updateItem, fetchDetail, fetchList } from '@/api/crud'
import type { IArticle, ICategory } from '@/types'

const { TextArea } = Input

const ArticleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form] = Form.useForm<IArticle>()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [iconUrl, setIconUrl] = useState<string>('')
  const [uploading, setUploading] = useState(false)

  // 加载分类 + 文章详情
  useEffect(() => {
    fetchList<ICategory>('categories').then(setCategories)
    if (id) {
      fetchDetail<IArticle>('articles', id).then((data) => {
        form.setFieldsValue(data)
        setIconUrl(data.icon || '')
      })
    }
  }, [id, form])

  // 提交
  const handleSubmit = async () => {
    const values = await form.validateFields()
    setLoading(true)
    try {
      const payload = { ...values, icon: iconUrl }
      if (id) {
        await updateItem('articles', id, payload)
      } else {
        await createItem('articles', payload)
      }
      message.success('保存成功')
      navigate('/articles/list')
    } finally {
      setLoading(false)
    }
  }

  // 缩略图上传
  const uploadProps = {
    name: 'file',
    action: getUploadUrl(),
    headers: getAuthHeaders(),
    showUploadList: false,
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('只能上传图片')
        return false
      }
      setUploading(true)
      return true
    },
    onSuccess: (res: any) => {
      setIconUrl(res.url)
      setUploading(false)
      message.success('上传成功')
    },
    onError: () => {
      setUploading(false)
      message.error('上传失败')
    },
  }

  return (
    <Card title={id ? '编辑文章' : '新建文章'}>
      <Form form={form} labelCol={{ span: 3 }} onFinish={handleSubmit}>
        <Form.Item label="所属分类" name="categories">
          <Select
            mode="multiple"
            placeholder="请选择分类"
            options={categories.map((c) => ({ label: c.name, value: c.id }))}
          />
        </Form.Item>

        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
          <Input placeholder="请输入文章标题" />
        </Form.Item>

        <Form.Item label="缩略图">
          <Upload {...uploadProps}>
            {iconUrl ? (
              <AntImage src={iconUrl} width={120} height={80} style={{ objectFit: 'cover' }} />
            ) : (
              <div style={{ width: 120, height: 80, border: '1px dashed #d9d9d9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {uploading ? <LoadingOutlined /> : <PlusOutlined />}
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item label="详情" name="body" rules={[{ required: true, message: '请输入内容' }]}>
          <MDEditor height={500} data-color-mode="light" />
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

export default ArticleEdit
