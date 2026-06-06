// Admin 后台路由
// 含：登录/注册/上传/邮件/通用 RESTful CRUD
import { Router, Application, Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import assert from 'http-assert'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../../middleware/auth'
import { resourceMiddleware, ResourceRequest } from '../../middleware/resource'
import { sendEmail } from '../../plugins/sendEmail'

const prisma = new PrismaClient()
const SECRET = process.env.JWT_SECRET || 'i2u34y12oi3u4y8'

export default (app: Application) => {
  const router = Router({ mergeParams: true })

  // ============ 通用 RESTful CRUD ============
  router.post('/', async (req: ResourceRequest, res: Response) => {
    const model = await req.Model.create({ data: req.body })
    res.send(model)
  })

  router.put('/:id', async (req: ResourceRequest, res: Response) => {
    const id = isNaN(Number(req.params.id)) ? req.params.id : Number(req.params.id)
    const model = await req.Model.update({ where: { id }, data: req.body })
    res.send(model)
  })

  router.delete('/:id', async (req: ResourceRequest, res: Response) => {
    const id = isNaN(Number(req.params.id)) ? req.params.id : Number(req.params.id)
    await req.Model.delete({ where: { id } })
    res.send({ success: true })
  })

  router.get('/', async (req: ResourceRequest, res: Response) => {
    const items = await req.Model.findMany({ take: 100 })
    res.send(items)
  })

  router.get('/:id', async (req: ResourceRequest, res: Response) => {
    const id = isNaN(Number(req.params.id)) ? req.params.id : Number(req.params.id)
    const model = await req.Model.findUnique({ where: { id } })
    res.send(model)
  })

  // ============ RESTful 资源路由（带鉴权）============
  app.use(
    '/admin/api/rest/:resource',
    authMiddleware(),
    resourceMiddleware(),
    router
  )

  // ============ 本地文件上传 ============
  const upload = multer({ dest: __dirname + '/../../../uploads' })
  app.post(
    '/admin/api/upload',
    authMiddleware(),
    upload.single('file'),
    (req: any, res: Response) => {
      const file = req.file
      file.url = `http://localhost:${process.env.PORT || 3000}/uploads/${file.filename}`
      res.send(file)
    }
  )

  // ============ 首次注册（部署时打开，完事注释）============
  app.post('/admin/api/register', async (req: Request, res: Response) => {
    const user = await prisma.adminUser.create({
      data: {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
      },
    })
    res.send(user)
  })

  // ============ 登录 ============
  app.post('/admin/api/login', async (req: Request, res: Response) => {
    const { username, password } = req.body
    const user = await prisma.adminUser.findUnique({ where: { username } })
    assert(user, 422, '用户不存在')
    const isValid = bcrypt.compareSync(password, (user as any).password)
    assert(isValid, 422, '密码错误')
    const token = jwt.sign({ id: (user as any).id }, SECRET)
    res.send({ token, username })
  })

  // ============ 邮件通知 ============
  app.post('/admin/api/email', async (req: Request, res: Response) => {
    sendEmail(req.body)
    res.send({ ok: 'ok' })
  })

  // ============ 统一错误处理 ============
  app.use(async (err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.statusCode || 500).send({ message: err.message })
  })
}
