// 友链
import { useEffect, useState } from 'react'
import { Card, Avatar, Skeleton } from 'antd'
import { getLinks } from '@/api/blog'

const Link: React.FC = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLinks().then(setData).finally(() => setLoading(false))
  }, [])

  if (loading) return <Skeleton active />

  return (
    <Card title="友情链接">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {data.map((item: any) => (
          <a key={item.id} href={item.site} target="_blank" rel="noreferrer" style={{ display: 'block' }}>
            <Card hoverable>
              <Card.Meta
                avatar={<Avatar src={item.icon}>{item.name?.[0]}</Avatar>}
                title={item.name}
                description={item.description}
              />
            </Card>
          </a>
        ))}
      </div>
    </Card>
  )
}

export default Link
