// 首页：文章分页列表
import { useEffect, useState } from 'react'
import { Card, List, Tag, Pagination, Skeleton, Space, Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getArticlePage, IArticleListResp } from '@/api/blog'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<IArticleListResp | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getArticlePage(page).then(setData).finally(() => setLoading(false))
  }, [page])

  return (
    <div>
      {loading ? (
        <Skeleton active />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={data?.list || []}
          renderItem={(article: any) => (
            <List.Item style={{ padding: 0, marginBottom: 16 }}>
              <Card hoverable onClick={() => navigate(`/article/list/${article.id}`)}>
                <Space size="large" align="start">
                  {article.icon && <Image src={article.icon} width={180} height={120} style={{ objectFit: 'cover', borderRadius: 4 }} />}
                  <div style={{ flex: 1 }}>
                    <h2 style={{ margin: 0, fontSize: 20 }}>{article.title}</h2>
                    <Space style={{ marginTop: 8 }}>
                      {article.categories?.map((c: any) => (
                        <Tag key={c.id} color="blue">{c.name}</Tag>
                      ))}
                    </Space>
                    <p style={{ marginTop: 8, color: '#999', fontSize: 13 }}>
                      {new Date(article.createdAt).toLocaleString()} · 浏览 {article.views} · 评论 {article.msgs}
                    </p>
                  </div>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      )}
      {data && (
        <Pagination
          style={{ textAlign: 'center', marginTop: 24 }}
          current={page}
          total={data.totalArticles}
          pageSize={6}
          onChange={setPage}
        />
      )}
    </div>
  )
}

export default Home
