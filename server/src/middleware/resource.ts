// 通用资源中间件
// 通过 URL 中的 :resource 参数动态加载 Prisma Model
// 实现"一套路由处理多张表"
import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * 资源名称 → Prisma Model 映射表
 * Prisma Model 名是 PascalCase（如 AdminUser）
 * 资源名是 camelCase（如 adminUsers）
 */
const MODEL_MAP: Record<string, keyof PrismaClient> = {
  adminUsers: 'adminUser',
  articles: 'article',
  categories: 'category',
  comments: 'comment',
  links: 'link',
  messages: 'message',
  users: 'user',
}

export interface ResourceRequest extends Request {
  Model?: any
}

/**
 * 中间件：把 req.params.resource 转成 prisma model 挂到 req.Model
 */
export const resourceMiddleware = () => {
  return (req: ResourceRequest, _res: Response, next: NextFunction) => {
    const resource = req.params.resource
    const modelKey = MODEL_MAP[resource]
    if (!modelKey) {
      return next(new Error(`资源 ${resource} 不存在`))
    }
    req.Model = (prisma as any)[modelKey]
    next()
  }
}
