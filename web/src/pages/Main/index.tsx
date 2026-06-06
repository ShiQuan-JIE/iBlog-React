// 主布局：Header + Outlet + Footer
import { Layout, Menu, Input } from 'antd'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'

const { Header, Content, Footer } = Layout
const { Search } = Input

const Main: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [keyword, setKeyword] = useState('')

  const menuItems = [
    { key: '/', label: '首页' },
    { key: '/archives', label: '归档' },
    { key: '/tags', label: '标签' },
    { key: '/links', label: '友链' },
    { key: '/message', label: '留言' },
    { key: '/about', label: '关于' },
  ]

  // 推断当前选中菜单
  const currentKey = '/' + (location.pathname.split('/').filter(Boolean)[0] || '')

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value)}`)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', display: 'flex', alignItems: 'center', padding: '0 40px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: 22, fontWeight: 'bold', color: '#69a8e7', marginRight: 40 }}>
          iBlog
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[currentKey]}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
          style={{ flex: 1, borderBottom: 'none' }}
        />
        <Search
          placeholder="搜索文章"
          allowClear
          enterButton={<SearchOutlined />}
          style={{ width: 240 }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={handleSearch}
        />
      </Header>

      <Content style={{ padding: '32px 40px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center', background: '#fff', color: '#999' }}>
        iBlog ©2024 · Powered by React 19 + Express + Prisma
      </Footer>
    </Layout>
  )
}

export default Main
