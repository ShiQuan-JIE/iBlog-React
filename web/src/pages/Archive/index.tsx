// 归档
import { useEffect, useState } from 'react'
import { Card, Timeline, Tag, Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getArchive } from '@/api/blog'

const Archive: React.FC = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getArchive().then(setData).finally(() => setLoading(false))
  }, [])

  if (loading) return <Skeleton active />

  return (
    <Card title="文章归档">
      {data.map((month) => (
        <div key={month._id} style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#69a8e7' }}>{month._id} 月 <small style={{ color: '#999' }}>({month.count} 篇)</small></h2>
          <Timeline>
            {month.list.map((item: any) => (
              <Timeline.Item key={item._id}>
                <span style={{ marginRight: 12, color: '#999' }}>{new Date(item.createdAt).toLocaleDateString()}</span>
                <a onClick={() => navigate(`/article/list/${item._id}`)} style={{ fontWeight: 500 }}>{item.title}</a>
                {item.categories?.map((c: any) => (
                  <Tag key={c.id} color="blue" style={{ marginLeft: 8 }}>{c.name}</Tag>
                ))}
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      ))}
    </Card>
  )
}

export default Archive
