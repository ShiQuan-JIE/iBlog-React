// 友链列表
import { Table, Button, Space, Image } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useCrudList } from '@/hooks/useCrudList'
import type { ILink } from '@/types'

const LinkList: React.FC = () => {
  const navigate = useNavigate()
  const { items, loading, remove } = useCrudList<ILink>('links')

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/links/create')}>
          新建友链
        </Button>
      </Space>
      <h1>友链列表</h1>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={items}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 80 },
          {
            title: '图标',
            dataIndex: 'icon',
            width: 80,
            render: (url: string) => (url ? <Image src={url} width={32} /> : '-'),
          },
          { title: '名称', dataIndex: 'name' },
          { title: '链接', dataIndex: 'site', render: (s: string) => <a href={s} target="_blank">{s}</a> },
          { title: '描述', dataIndex: 'description', ellipsis: true },
          {
            title: '操作',
            width: 200,
            render: (_: any, record: ILink) => (
              <Space>
                <Button type="link" icon={<EditOutlined />} onClick={() => navigate(`/links/edit/${record.id}`)}>
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

export default LinkList
