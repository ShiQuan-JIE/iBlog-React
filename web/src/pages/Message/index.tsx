// 留言板
import { useEffect, useState } from 'react'
import { Card, Input, Button, List, Avatar, message } from 'antd'
import { getMessages, addMessage, createUser, sendEmail } from '@/api/blog'
import { useAppDispatch, useAppSelector } from '@/store'
import { setUserInfo } from '@/store/slices/userSlice'

const { TextArea } = Input

const Message: React.FC = () => {
  const [list, setList] = useState<any[]>([])
  const [content, setContent] = useState('')
  const userInfo = useAppSelector((s) => s.user.userInfo)
  const dispatch = useAppDispatch()

  const load = () => getMessages().then(setList)
  useEffect(() => { load() }, [])

  const handleSubmit = async () => {
    if (!content.trim()) return message.warning('请输入留言内容')
    let userId = userInfo.id
    if (!userId) {
      const nickName = `游客${Math.floor(Math.random() * 10000)}`
      const user: any = await createUser({ nickName })
      userId = user.id
      dispatch(setUserInfo({ ...userInfo, id: userId, nickName }))
    }
    await addMessage({ nickName: userInfo.nickName, content, userId })
    // 通知博主
    sendEmail({ recipient: 'admin@iblog.com', subject: '新留言', html: `<p>${content}</p>` })
    message.success('留言成功')
    setContent('')
    load()
  }

  return (
    <Card title="留言板">
      <TextArea rows={3} placeholder="留下你的想法..." value={content} onChange={(e) => setContent(e.target.value)} />
      <Button type="primary" style={{ marginTop: 8 }} onClick={handleSubmit}>提交</Button>

      <List
        style={{ marginTop: 24 }}
        dataSource={list}
        renderItem={(m: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{m.nickName?.[0]}</Avatar>}
              title={m.nickName}
              description={
                <>
                  <p>{m.content}</p>
                  <span style={{ color: '#999', fontSize: 12 }}>{new Date(m.createdAt).toLocaleString()}</span>
                </>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  )
}

export default Message
