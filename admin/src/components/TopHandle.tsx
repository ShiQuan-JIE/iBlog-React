// 顶部操作栏组件
import { useNavigate } from 'react-router-dom'
import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface Props {
  title: string
  content: string
  path: string
}

const TopHandle: React.FC<Props> = ({ title, content, path }) => {
  const navigate = useNavigate()
  return (
    <Space style={{ marginBottom: 16 }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => navigate(path)}
      >
        {content}
      </Button>
    </Space>
  )
}

export default TopHandle
