// 路由配置
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Spin } from 'antd'

// 路由懒加载
const Login = lazy(() => import('@/pages/Login'))
const Main = lazy(() => import('@/pages/Main'))
const CategoryList = lazy(() => import('@/pages/Category/CategoryList'))
const CategoryEdit = lazy(() => import('@/pages/Category/CategoryEdit'))
const ArticleList = lazy(() => import('@/pages/Article/ArticleList'))
const ArticleEdit = lazy(() => import('@/pages/Article/ArticleEdit'))
const CommentList = lazy(() => import('@/pages/Comment/CommentList'))
const LinkList = lazy(() => import('@/pages/Link/LinkList'))
const LinkEdit = lazy(() => import('@/pages/Link/LinkEdit'))
const MessageList = lazy(() => import('@/pages/Message/MessageList'))
const UserList = lazy(() => import('@/pages/User/UserList'))
const AdminUserList = lazy(() => import('@/pages/AdminUser/AdminUserList'))
const AdminUserEdit = lazy(() => import('@/pages/AdminUser/AdminUserEdit'))

const Loading = () => (
  <div style={{ textAlign: 'center', padding: 50 }}>
    <Spin size="large" />
  </div>
)

const wrap = (Comp: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<Loading />}>
    <Comp />
  </Suspense>
)

// 路由守卫：未登录跳 /login
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: wrap(Login),
  },
  {
    path: '/',
    element: <RequireAuth>{wrap(Main)}</RequireAuth>,
    children: [
      { index: true, element: <Navigate to="/articles/list" replace /> },

      { path: 'categories/list', element: wrap(CategoryList) },
      { path: 'categories/create', element: wrap(CategoryEdit) },
      { path: 'categories/edit/:id', element: wrap(CategoryEdit) },

      { path: 'articles/list', element: wrap(ArticleList) },
      { path: 'articles/create', element: wrap(ArticleEdit) },
      { path: 'articles/edit/:id', element: wrap(ArticleEdit) },

      { path: 'comments/list', element: wrap(CommentList) },

      { path: 'links/list', element: wrap(LinkList) },
      { path: 'links/create', element: wrap(LinkEdit) },
      { path: 'links/edit/:id', element: wrap(LinkEdit) },

      { path: 'messages/list', element: wrap(MessageList) },
      { path: 'users/list', element: wrap(UserList) },

      { path: 'admin_users/list', element: wrap(AdminUserList) },
      { path: 'admin_users/create', element: wrap(AdminUserEdit) },
      { path: 'admin_users/edit/:id', element: wrap(AdminUserEdit) },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
