// iBlog-React 后端服务入口
// Express + Prisma + PostgreSQL
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import 'dotenv/config'

import adminRouter from './routes/admin'
import webRouter from './routes/web'

const app: Application = express()

// JWT 密钥
app.set('secret', process.env.JWT_SECRET || 'i2u34y12oi3u4y8')

// ============ 全局中间件 ============
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// ============ 路由 ============
adminRouter(app)
webRouter(app)

// ============ 根路径 ============
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'iBlog-React API Server',
    version: '1.0.0',
    endpoints: {
      admin: '/admin/api',
      web: '/web/api',
    },
  })
})

// ============ 404 处理 ============
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: '接口不存在' })
})

// ============ 启动服务 ============
const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
  console.log(`📦 Admin API: http://localhost:${PORT}/admin/api`)
  console.log(`🌐 Web API:   http://localhost:${PORT}/web/api`)
})
