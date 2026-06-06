// 评论列表
import { Table, Avatar, Space, Typography } from 'antd'
import { useCrudList } from '@/hooks/useCrudList'
import type { IComment } from '@/types'

const { Text } = Typography

const CommentList: React.FC = () => {
  const { items, loading, remove } = useCrudList<IComment>('comments')

  return (
    <div>
      <h1>评论列表</h1>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={items}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 80 },
          {
            title: '用户',
            dataIndex: 'nickName',
            render: (name: string, record: IComment) => (
              <Space>
                <Avatar src={record.avatarImg} size="small">
                  {name?.[0]}
                </Avatar>
                <Text>{name}</Text>
              </Space>
            ),
          },
          {
            title: '内容',
            dataIndex: 'content',
            ellipsis: true,
          },
          { title: '所属文章 ID', dataIndex: 'articleId', width: 120 },
          {
            title: '时间',
            dataIndex: 'createdAt',
            width: 180,
            render: (t: string) => new Date(t).toLocaleString(),
          },
          {
            title: '操作',
            width: 100,
            render: (_: any, record: IComment) => (
              <a onClick={() => remove(record.id)} style={{ color: '#ff4d4f' }}>删除</a>
            ),
          },
        ]}
      />
    </div>
  )
}

export default CommentList
