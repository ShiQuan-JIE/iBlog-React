// 博客端 Web 路由
// 包含：文章/评论/留言/友链/标签/归档/时间等公开接口
import { Router, Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendEmail } from '../../plugins/sendEmail'

const prisma = new PrismaClient()

export default (app: Application) => {
  const router = Router()

  // ============ 文章 ============

  // 文章列表（全部，按时间倒序）
  router.get('/articles/list', async (_req: Request, res: Response) => {
    const data = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.send(data)
  })

  // 最近文章（4 篇）
  router.get('/articles/recent', async (_req: Request, res: Response) => {
    const data = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
    })
    res.send(data)
  })

  // 分页文章
  router.get('/articles/:pageNum', async (req: Request, res: Response) => {
    const currentPage = Number(req.params.pageNum)
    const PAGE_SIZE = 6
    const [list, count] = await Promise.all([
      prisma.article.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: { categories: true },
      }),
      prisma.article.count(),
    ])
    res.send({
      list,
      totalArticles: count,
      totalPage: Math.ceil(count / PAGE_SIZE),
      currentPage,
    })
  })

  // 文章详情
  router.get('/articles/list/:id', async (req: Request, res: Response) => {
    // 浏览量 +1
    await prisma.article.update({
      where: { id: Number(req.params.id) },
      data: { views: { increment: 1 } },
    })
    const data = await prisma.article.findUnique({
      where: { id: Number(req.params.id) },
      include: { categories: true },
    })
    res.send(data)
  })

  // ============ 按月归档 ============
  // Prisma 不支持 MongoDB 风格的 $group，应用层聚合
  router.get('/archive', async (_req: Request, res: Response) => {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      include: { categories: true },
    })

    // 按月份分组
    const grouped: Record<number, any> = {}
    articles.forEach((article: any) => {
      const month = article.createdAt.getMonth() + 1
      if (!grouped[month]) {
        grouped[month] = { _id: month, count: 0, list: [] }
      }
      grouped[month].count++
      grouped[month].list.push({
        _id: article.id,
        title: article.title,
        categories: article.categories,
        createdAt: article.createdAt,
      })
    })

    const data = Object.values(grouped).sort((a: any, b: any) => b._id - a._id)
    res.send(data)
  })

  // ============ 标签统计 ============
  router.get('/tags', async (_req: Request, res: Response) => {
    const categories = await prisma.category.findMany({
      include: { articles: { orderBy: { createdAt: 'desc' } } },
    })

    const data = categories
      .map((cat: any) => ({
        _id: cat.name,
        count: cat.articles.length,
        list: cat.articles.map((a: any) => ({
          _id: a.id,
          title: a.title,
          createdAt: a.createdAt,
        })),
      }))
      .sort((a: any, b: any) => b.count - a.count || a._id.localeCompare(b._id))

    res.send(data)
  })

  // ============ 友链 ============
  router.get('/links/list', async (_req: Request, res: Response) => {
    const data = await prisma.link.findMany()
    res.send(data)
  })

  // ============ 博客用户 ============
  router.post('/users', async (req: Request, res: Response) => {
    const data = await prisma.user.create({ data: req.body })
    res.send(data)
  })

  router.get('/users', async (_req: Request, res: Response) => {
    const data = await prisma.user.findMany()
    res.send(data)
  })

  router.put('/users/:id', async (req: Request, res: Response) => {
    const data = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    })
    res.send(data)
  })

  router.get('/users/:id', async (req: Request, res: Response) => {
    const data = await prisma.user.findUnique({ where: { id: Number(req.params.id) } })
    res.send(data)
  })

  // ============ 邮件通知 ============
  router.post('/email', async (req: Request, res: Response) => {
    sendEmail(req.body)
    res.send({ ok: 'ok' })
  })

  // ============ 评论 ============
  router.post('/comments', async (req: Request, res: Response) => {
    const data = await prisma.comment.create({ data: req.body })
    // 文章评论数 +1
    if (req.body.articleId) {
      await prisma.article.update({
        where: { id: Number(req.body.articleId) },
        data: { msgs: { increment: 1 } },
      })
    }
    res.send(data)
  })

  router.get('/comments/:articleId', async (req: Request, res: Response) => {
    const comments = await prisma.comment.findMany({
      where: { articleId: Number(req.params.articleId) },
      orderBy: { createdAt: 'desc' },
    })
    res.send(comments)
  })

  // ============ 留言 ============
  router.post('/messages', async (req: Request, res: Response) => {
    const data = await prisma.message.create({ data: req.body })
    res.send(data)
  })

  router.get('/messages', async (_req: Request, res: Response) => {
    const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } })
    res.send(messages)
  })

  // ============ 服务器时间 ============
  router.get('/time', async (_req: Request, res: Response) => {
    res.send({ data: Date.now() })
  })

  app.use('/web/api', router)
}
