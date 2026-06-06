# 后端

iBlog-React 后端服务，基于 **Express 4 + Prisma 5 + PostgreSQL + TypeScript**。

## 快速开始

### 1. 安装 PostgreSQL 并创建数据库

```sql
CREATE DATABASE iblog;
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env，填入真实的数据库连接串和邮件配置
```

### 4. 同步数据库表结构

```bash
pnpm prisma:push
```

### 5. 启动开发服务

```bash
pnpm dev
```

服务将运行在 `http://localhost:3000`。

## 目录结构

```
server/
├── prisma/
│   └── schema.prisma      # 数据模型
├── src/
│   ├── index.ts           # 入口
│   ├── routes/
│   │   ├── admin/         # 后台 API
│   │   └── web/           # 博客端 API
│   ├── middleware/
│   │   ├── auth.ts        # JWT 鉴权
│   │   └── resource.ts    # 通用资源中间件
│   └── plugins/
│       ├── db.ts          # Prisma Client
│       └── sendEmail.ts   # 邮件服务
├── uploads/               # 本地上传文件
├── .env.example
├── package.json
└── tsconfig.json
```

## API 接口

### Admin（需鉴权）
- `POST   /admin/api/login`             登录
- `POST   /admin/api/register`          注册（首次部署时启用）
- `POST   /admin/api/upload`            文件上传
- `POST   /admin/api/email`             邮件通知
- `*      /admin/api/rest/:resource`    通用 RESTful CRUD

### Web（公开）
- `GET    /web/api/articles/list`        全部文章
- `GET    /web/api/articles/recent`      最近 4 篇
- `GET    /web/api/articles/:page`       分页
- `GET    /web/api/articles/list/:id`    详情
- `GET    /web/api/archive`              归档
- `GET    /web/api/tags`                 标签
- `GET    /web/api/links/list`           友链
- `GET    /web/api/comments/:articleId`  评论列表
- `POST   /web/api/comments`             发表评论
- `GET    /web/api/messages`             留言
- `POST   /web/api/messages`             发表留言
- `GET    /web/api/time`                 服务器时间

## 通用 RESTful 资源

支持 7 张表：articles、categories、comments、links、messages、users、adminUsers

| 方法   | 路径                              | 说明   |
|--------|-----------------------------------|--------|
| GET    | /admin/api/rest/:resource         | 列表   |
| GET    | /admin/api/rest/:resource/:id     | 详情   |
| POST   | /admin/api/rest/:resource         | 新增   |
| PUT    | /admin/api/rest/:resource/:id     | 更新   |
| DELETE | /admin/api/rest/:resource/:id     | 删除   |
