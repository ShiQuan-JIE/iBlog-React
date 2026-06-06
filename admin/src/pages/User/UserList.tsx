// 博客用户列表
import { Table, Avatar, Space, Typography } from 'antd'
import { useCrudList } from '@/hooks/useCrudList'
import type { IUser } from '@/types'

const { Text } = Typography

const UserList: React.FC = () => {
  const { items, loading, remove } = useCrudList<IUser>('users')

  return (
    <div>
      <h1>用户列表</h1>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={items}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 80 },
          {
            title: '头像',
            dataIndex: 'avatarImg',
            width: 80,
            render: (url: string, record: IUser) => (
              <Avatar src={url}>{record.nickName?.[0]}</Avatar>
            ),
          },
          { title: '昵称', dataIndex: 'nickName' },
          { title: '邮箱', dataIndex: 'email' },
          {
            title: '个人网站',
            dataIndex: 'url',
            render: (u: string) => (u ? <a href={u} target="_blank">{u}</a> : '-'),
          },
          {
            title: '时间',
            dataIndex: 'createdAt',
            render: (t: string) => new Date(t).toLocaleString(),
          },
          {
            title: '操作',
            width: 100,
            render: (_: any, record: IUser) => (
              <a onClick={() => remove(record.id)} style={{ color: '#ff4d4f' }}>删除</a>
            ),
          },
        ]}
      />
    </div>
  )
}

export default UserList
