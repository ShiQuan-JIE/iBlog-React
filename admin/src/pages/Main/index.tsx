// 主布局：左侧菜单 + 顶部用户信息 + 内容区
import { Layout, Menu, Dropdown, Avatar } from 'antd'
import {
  AppstoreOutlined,
  FolderOutlined,
  FileTextOutlined,
  CommentOutlined,
  LinkOutlined,
  MessageOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { logout } from '@/store/slices/authSlice'

const { Sider, Header, Content } = Layout

const Main: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const username = useAppSelector((s) => s.auth.username)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  // 当前选中的菜单（从 URL 推断）
  const selectedKey = '/' + location.pathname.split('/').filter(Boolean).slice(0, 2).join('/')

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} style={{ background: '#001529' }}>
        <div style={{ color: '#fff', textAlign: 'center', padding: '20px 0', fontSize: 18, fontWeight: 'bold' }}>
          iBlog Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: '/categories/list',
              icon: <FolderOutlined />,
              label: '分类管理',
              children: [
                { key: '/categories/create', label: '新建分类' },
                { key: '/categories/list', label: '分类列表' },
              ],
            },
            {
              key: '/articles/list',
              icon: <FileTextOutlined />,
              label: '文章管理',
              children: [
                { key: '/articles/create', label: '新建文章' },
                { key: '/articles/list', label: '文章列表' },
              ],
            },
            {
              key: '/comments/list',
              icon: <CommentOutlined />,
              label: '评论管理',
              children: [
                { key: '/comments/list', label: '评论列表' },
              ],
            },
            {
              key: '/links/list',
              icon: <LinkOutlined />,
              label: '友链管理',
              children: [
                { key: '/links/create', label: '新建友链' },
                { key: '/links/list', label: '友链列表' },
              ],
            },
            {
              key: '/messages/list',
              icon: <MessageOutlined />,
              label: '留言管理',
              children: [
                { key: '/messages/list', label: '留言列表' },
              ],
            },
            {
              key: '/users/list',
              icon: <UserOutlined />,
              label: '博客用户',
              children: [
                { key: '/users/list', label: '用户列表' },
              ],
            },
            {
              key: '/admin_users/list',
              icon: <SettingOutlined />,
              label: '系统设置',
              children: [
                { key: '/admin_users/create', label: '新建管理员' },
                { key: '/admin_users/list', label: '管理员列表' },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#69a8e7', textAlign: 'right', padding: '0 24px', color: '#fff' }}>
          <span style={{ marginRight: 12 }}>{username}</span>
          <Dropdown
            menu={{
              items: [
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: '退出',
                  onClick: handleLogout,
                },
              ],
            }}
          >
            <Avatar style={{ background: '#fff', color: '#69a8e7', cursor: 'pointer' }}>
              {username?.[0]?.toUpperCase() || 'A'}
            </Avatar>
          </Dropdown>
        </Header>
        <Content style={{ margin: 24, padding: 24, background: '#fff', minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Main
