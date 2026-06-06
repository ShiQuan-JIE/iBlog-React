// 管理员列表
import { Table, Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useCrudList } from '@/hooks/useCrudList'
import type { IAdminUser } from '@/types'

const AdminUserList: React.FC = () => {
  const navigate = useNavigate()
  const { items, loading, remove } = useCrudList<IAdminUser>('adminUsers')

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin_users/create')}>
          新建管理员
        </Button>
      </Space>
      <h1>管理员列表</h1>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={items}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 80 },
          { title: '用户名', dataIndex: 'username' },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            render: (t: string) => new Date(t).toLocaleString(),
          },
          {
            title: '操作',
            width: 200,
            render: (_: any, record: IAdminUser) => (
              <Space>
                <Button type="link" icon={<EditOutlined />} onClick={() => navigate(`/admin_users/edit/${record.id}`)}>
                  编辑
                </Button>
                <Button type="link" danger icon={<DeleteOutlined />} onClick={() => remove(record.id)}>
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

export default AdminUserList
