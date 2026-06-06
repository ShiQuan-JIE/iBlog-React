// 路由
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Spin } from 'antd'

const Main = lazy(() => import('@/pages/Main'))
const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))
const Archive = lazy(() => import('@/pages/Archive'))
const Tag = lazy(() => import('@/pages/Tag'))
const Link = lazy(() => import('@/pages/Link'))
const Message = lazy(() => import('@/pages/Message'))
const About = lazy(() => import('@/pages/About'))
const Search = lazy(() => import('@/pages/Search'))

const Loading = () => (
  <div style={{ textAlign: 'center', padding: 100 }}>
    <Spin size="large" />
  </div>
)

const wrap = (Comp: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<Loading />}>
    <Comp />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: wrap(Main),
    children: [
      { index: true, element: wrap(Home) },
      { path: 'archives', element: wrap(Archive) },
      { path: 'tags', element: wrap(Tag) },
      { path: 'links', element: wrap(Link) },
      { path: 'message', element: wrap(Message) },
      { path: 'about', element: wrap(About) },
      { path: 'search', element: wrap(Search) },
      { path: 'article/list/:id', element: wrap(Article) },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
