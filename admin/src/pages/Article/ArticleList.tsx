// 文章列表
import { Table, Button, Space, Image } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useCrudList } from '@/hooks/useCrudList'
import type { IArticle } from '@/types'

const ArticleList: React.FC = () => {
  const navigate = useNavigate()
  const { items, loading, remove } = useCrudList<IArticle>('articles')

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/articles/create')}>
          写博客
        </Button>
      </Space>
      <h1>文章列表</h1>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={items}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 80 },
          {
            title: '缩略图',
            dataIndex: 'icon',
            width: 100,
            render: (url: string) => (url ? <Image src={url} width={50} /> : '-'),
          },
          { title: '文章标题', dataIndex: 'title' },
          { title: '浏览量', dataIndex: 'views', width: 100 },
          { title: '评论数', dataIndex: 'msgs', width: 100 },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            render: (t: string) => new Date(t).toLocaleString(),
          },
          {
            title: '操作',
            width: 200,
            render: (_: any, record: IArticle) => (
              <Space>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => navigate(`/articles/edit/${record.id}`)}
                >
                  编辑
                </Button>
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => remove(record.id)}
                >
                  删除
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </div>
  )
}

export default ArticleList
