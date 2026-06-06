// 文章详情 + 评论
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Tag, Space, Skeleton, Input, Button, Avatar, List, message } from 'antd'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { getArticleDetail, getComments, addComment, createUser } from '@/api/blog'
import { useAppDispatch, useAppSelector } from '@/store'
import { setUserInfo } from '@/store/slices/userSlice'

const { TextArea } = Input

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [content, setContent] = useState('')
  const userInfo = useAppSelector((s) => s.user.userInfo)
  const dispatch = useAppDispatch()

  // 加载文章和评论
  useEffect(() => {
    if (id) {
      getArticleDetail(Number(id)).then(setArticle)
      getComments(Number(id)).then(setComments)
    }
  }, [id])

  // 提交评论
  const handleSubmit = async () => {
    if (!content.trim()) {
      message.warning('请输入评论内容')
      return
    }
    let userId = userInfo.id
    if (!userId) {
      // 首次评论，创建用户
      const nickName = `游客${Math.floor(Math.random() * 10000)}`
      const user: any = await createUser({ nickName, email: '', url: '', avatarImg: '' })
      userId = user.id
      dispatch(setUserInfo({ ...userInfo, id: userId, nickName }))
    }
    await addComment({
      nickName: userInfo.nickName || `游客${userId}`,
      content,
      articleId: Number(id),
      userId,
    })
    message.success('评论成功')
    setContent('')
    const list = await getComments(Number(id))
    setComments(list)
  }

  if (!article) return <Skeleton active />

  return (
    <div>
      <Card>
        <h1 style={{ textAlign: 'center' }}>{article.title}</h1>
        <Space style={{ justifyContent: 'center', width: '100%', display: 'flex', marginBottom: 16 }}>
          {article.categories?.map((c: any) => (
            <Tag key={c.id} color="blue">{c.name}</Tag>
          ))}
          <span style={{ color: '#999' }}>{new Date(article.createdAt).toLocaleString()}</span>
        </Space>
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {article.body}
          </ReactMarkdown>
        </div>
      </Card>

      <Card title={`评论 (${comments.length})`} style={{ marginTop: 24 }}>
        <TextArea rows={3} placeholder="说点什么吧..." value={content} onChange={(e) => setContent(e.target.value)} />
        <Button type="primary" style={{ marginTop: 8 }} onClick={handleSubmit}>发表评论</Button>

        <List
          style={{ marginTop: 24 }}
          dataSource={comments}
          renderItem={(c: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar>{c.nickName?.[0]}</Avatar>}
                title={c.nickName}
                description={
                  <>
                    <p>{c.content}</p>
                    <span style={{ color: '#999', fontSize: 12 }}>{new Date(c.createdAt).toLocaleString()}</span>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default Article
