// 留言列表
import { Table, Avatar, Space, Typography } from 'antd'
import { useCrudList } from '@/hooks/useCrudList'
import type { IMessage } from '@/types'

const { Text } = Typography

const MessageList: React.FC = () => {
  const { items, loading, remove } = useCrudList<IMessage>('messages')

  return (
    <div>
      <h1>留言列表</h1>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={items}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 80 },
          {
            title: '用户',
            dataIndex: 'nickName',
            render: (name: string, record: IMessage) => (
              <Space>
                <Avatar src={record.avatarImg} size="small">{name?.[0]}</Avatar>
                <Text>{name}</Text>
              </Space>
            ),
          },
          { title: '内容', dataIndex: 'content', ellipsis: true },
          { title: '父留言 ID', dataIndex: 'parentId', width: 120, render: (v: number) => v || '-' },
          {
            title: '时间',
            dataIndex: 'createdAt',
            width: 180,
            render: (t: string) => new Date(t).toLocaleString(),
          },
          {
            title: '操作',
            width: 100,
            render: (_: any, record: IMessage) => (
              <a onClick={() => remove(record.id)} style={{ color: '#ff4d4f' }}>删除</a>
            ),
          },
        ]}
      />
    </div>
  )
}

export default MessageList
