// 标签
import { useEffect, useState } from 'react'
import { Card, Tag, List, Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getTags } from '@/api/blog'

const TagPage: React.FC = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getTags().then(setData).finally(() => setLoading(false))
  }, [])

  if (loading) return <Skeleton active />

  return (
    <Card title="标签云">
      {data.map((tag) => (
        <div key={tag._id} style={{ marginBottom: 24 }}>
          <Tag color="blue" style={{ fontSize: 14, padding: '4px 10px' }}>{tag._id} ({tag.count})</Tag>
          <List
            size="small"
            dataSource={tag.list}
            renderItem={(item: any) => (
              <List.Item>
                <a onClick={() => navigate(`/article/list/${item._id}`)}>{item.title}</a>
                <span style={{ color: '#999', fontSize: 12 }}>{new Date(item.createdAt).toLocaleDateString()}</span>
              </List.Item>
            )}
          />
        </div>
      ))}
    </Card>
  )
}

export default TagPage
