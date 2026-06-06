// 测试数据种子脚本
// 用法：npx ts-node prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 分类
  const react = await prisma.category.create({ data: { name: 'React' } })
  const nodejs = await prisma.category.create({ data: { name: 'Node.js' } })
  const ts = await prisma.category.create({ data: { name: 'TypeScript' } })
  const pg = await prisma.category.create({ data: { name: 'PostgreSQL' } })
  const docker = await prisma.category.create({ data: { name: 'Docker' } })

  console.log('分类创建完成:', [react, nodejs, ts, pg, docker].map(c => c.name))

  // 文章
  const articles = [
    {
      title: 'React 19 新特性详解',
      body: 'React 19 带来了许多令人兴奋的新特性，包括 Server Components、Actions、use() Hook 等。本文将深入探讨这些变化及其对开发体验的影响。',
      categories: { connect: [{ id: react.id }] },
    },
    {
      title: 'Node.js 性能优化实践',
      body: '在高并发场景下，Node.js 的性能优化至关重要。本文分享了内存管理、事件循环优化、集群部署等实践经验。',
      categories: { connect: [{ id: nodejs.id }] },
    },
    {
      title: 'TypeScript 5.0 类型体操',
      body: 'TypeScript 5.0 引入了装饰器、const 类型参数等新特性，让类型系统更加强大。本文通过实例讲解高级类型技巧。',
      categories: { connect: [{ id: ts.id }] },
    },
    {
      title: 'PostgreSQL 索引优化指南',
      body: 'PostgreSQL 支持多种索引类型，合理使用索引可以大幅提升查询性能。本文介绍 B-tree、GIN、GiST 等索引的使用场景。',
      categories: { connect: [{ id: pg.id }] },
    },
    {
      title: 'Docker 容器化部署最佳实践',
      body: '从 Dockerfile 编写到 docker-compose 编排，全面介绍容器化部署的最佳实践和常见坑点。',
      categories: { connect: [{ id: docker.id }] },
    },
    {
      title: 'React Hooks 深入理解',
      body: 'useState、useEffect、useContext、useReducer... 本文带你深入理解每个 Hook 的原理和最佳实践。',
      categories: { connect: [{ id: react.id }] },
    },
    {
      title: 'Express 中间件原理与实战',
      body: '中间件是 Express 的核心概念，本文从源码层面分析中间件的执行机制，并分享自定义中间件的技巧。',
      categories: { connect: [{ id: nodejs.id }] },
    },
    {
      title: 'Prisma ORM 完全指南',
      body: 'Prisma 是下一代 Node.js ORM，支持 PostgreSQL、MySQL、SQLite 等多种数据库。本文从零开始教你使用 Prisma。',
      categories: { connect: [{ id: pg.id }] },
    },
  ]

  for (const article of articles) {
    const created = await prisma.article.create({ data: article })
    console.log('文章创建:', created.title)
  }

  // 友链
  const links = [
    { name: 'GitHub', site: 'https://github.com', description: '全球最大代码托管平台' },
    { name: 'MDN', site: 'https://developer.mozilla.org', description: 'Web 开发权威文档' },
    { name: 'Stack Overflow', site: 'https://stackoverflow.com', description: '程序员问答社区' },
  ]
  for (const link of links) {
    await prisma.link.create({ data: link })
  }
  console.log('友链创建完成')

  // 留言
  const messages = [
    { content: '博客做得不错！', nickName: '小明' },
    { content: '学到了很多，感谢分享！', nickName: '小红' },
  ]
  for (const msg of messages) {
    await prisma.message.create({ data: msg })
  }
  console.log('留言创建完成')

  console.log('\n测试数据插入完成！')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
