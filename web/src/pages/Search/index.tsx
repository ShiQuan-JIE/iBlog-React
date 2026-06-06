// 搜索（基于 URL query ?q=xxx）
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Card, List, Tag, Empty } from 'antd'
import http from '@/api/http'

const Search: React.FC = () => {
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const [list, setList] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (q) {
      // 前端简单搜索：从全部文章里过滤
      http.get('/articles/list').then((r) => {
        setList(
          r.data.filter((a: any) =>
            a.title.toLowerCase().includes(q.toLowerCase())
          )
        )
      })
    }
  }, [q])

  return (
    <Card title={`搜索: "${q}"`}>
      {list.length === 0 ? (
        <Empty description="没有找到相关文章" />
      ) : (
        <List
          dataSource={list}
          renderItem={(item: any) => (
            <List.Item onClick={() => navigate(`/article/list/${item.id}`)} style={{ cursor: 'pointer' }}>
              <List.Item.Meta
                title={item.title}
                description={
                  <span style={{ color: '#999' }}>
                    {new Date(item.createdAt).toLocaleString()} · 浏览 {item.views}
                  </span>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  )
}

export default Search
