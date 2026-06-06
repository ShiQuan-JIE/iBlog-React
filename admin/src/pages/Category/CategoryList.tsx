// 分类列表
import { Table, Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useCrudList } from '@/hooks/useCrudList'
import type { ICategory } from '@/types'

const CategoryList: React.FC = () => {
  const navigate = useNavigate()
  const { items, loading, remove } = useCrudList<ICategory>('categories')

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/categories/create')}>
          新建分类
        </Button>
      </Space>
      <h1>分类列表</h1>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={items}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 100 },
          { title: '分类名', dataIndex: 'name' },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            render: (t: string) => new Date(t).toLocaleString(),
          },
          {
            title: '操作',
            width: 200,
            render: (_: any, record: ICategory) => (
              <Space>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => navigate(`/categories/edit/${record.id}`)}
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

export default CategoryList
