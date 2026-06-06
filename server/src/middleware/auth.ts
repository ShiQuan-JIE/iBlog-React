// JWT 鉴权中间件
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import assert from 'http-assert'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface AuthRequest extends Request {
  user?: any
}

/**
 * JWT 鉴权中间件
 * 1. 从 Authorization 头解析 token
 * 2. 验证 token 有效性
 * 3. 加载管理员信息挂载到 req.user
 */
export const authMiddleware = () => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')

    const secret = req.app.get('secret')
    const { id } = jwt.verify(token, secret) as { id: number }
    assert(id, 401, '请先登录')

    req.user = await prisma.adminUser.findUnique({ where: { id } })
    assert(req.user, 401, '请先登录')

    await next()
  }
}
