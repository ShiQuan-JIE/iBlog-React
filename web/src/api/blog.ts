// 通用 Web API
import http from './http'

// ============ 文章 ============
export interface IArticleListResp {
  list: any[]
  totalArticles: number
  totalPage: number
  currentPage: number
}

export const getArticlePage = (page: number) =>
  http.get<IArticleListResp>(`/articles/${page}`).then((r) => r.data)

export const getArticleRecent = () =>
  http.get('/articles/recent').then((r) => r.data)

export const getArticleDetail = (id: number) =>
  http.get(`/articles/list/${id}`).then((r) => r.data)

export const getArchive = () =>
  http.get('/archive').then((r) => r.data)

export const getTags = () =>
  http.get('/tags').then((r) => r.data)

// ============ 友链 ============
export const getLinks = () =>
  http.get('/links/list').then((r) => r.data)

// ============ 评论 ============
export const getComments = (articleId: number) =>
  http.get(`/comments/${articleId}`).then((r) => r.data)

export const addComment = (data: any) =>
  http.post('/comments', data).then((r) => r.data)

// ============ 留言 ============
export const getMessages = () =>
  http.get('/messages').then((r) => r.data)

export const addMessage = (data: any) =>
  http.post('/messages', data).then((r) => r.data)

// ============ 邮件 ============
export const sendEmail = (data: any) =>
  http.post('/email', data).then((r) => r.data)

// ============ 用户 ============
export const createUser = (data: any) =>
  http.post('/users', data).then((r) => r.data)

// ============ 时间 ============
export const getServerTime = () =>
  http.get('/time').then((r) => r.data)
