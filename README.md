# iBlog-React 博客系统

> 基于 **React 19 + Express + Prisma + PostgreSQL** 的现代化全栈博客系统

## 技术栈

### 前端
- ⚛️ **React 19** + **TypeScript 5** + **Vite 5**
- 🎨 **Ant Design 5**（UI 组件库）
- 🗂️ **Redux Toolkit** + **react-redux**（状态管理）
- 🌐 **React Router 6**（路由）
- 📡 **Axios**（HTTP 请求）
- 📝 **@uiw/react-md-editor**（Markdown 编辑器）
- 🖍️ **react-markdown + highlight.js**（Markdown 渲染 + 代码高亮）

### 后端
- 🚀 **Express 4** + **TypeScript 5**
- 🗄️ **Prisma 5** + **PostgreSQL**（ORM + 数据库）
- 🔐 **JWT** + **bcryptjs**（认证 + 加密）
- 📤 **Multer**（文件上传）
- 📧 **Nodemailer**（邮件通知）

## 项目结构

```
iBlog-React/
├── server/         # 后端服务
│   ├── prisma/     # Prisma Schema
│   ├── src/
│   │   ├── routes/    # 路由（admin + web）
│   │   ├── middleware/ # 中间件（auth + resource）
│   │   ├── plugins/    # 插件（db + sendEmail）
│   │   └── index.ts    # 入口
│   └── package.json
├── admin/          # 管理后台
│   ├── src/
│   │   ├── pages/     # 业务页面
│   │   ├── api/       # HTTP 封装
│   │   ├── store/     # Redux Store
│   │   ├── router/    # 路由配置
│   │   └── components/
│   └── package.json
└── web/            # 博客前台
    ├── src/
    │   ├── pages/     # 业务页面
    │   ├── api/       # HTTP 封装
    │   └── store/
    └── package.json
```

## 快速开始

### 1. 安装 PostgreSQL

```bash
# 启动 PostgreSQL 服务后创建数据库
psql -U postgres
CREATE DATABASE iblog;
```

### 2. 安装依赖

```bash
# 在项目根目录执行
pnpm install-all
```

### 3. 配置后端环境变量

```bash
cd server
cp .env.example .env
# 编辑 .env 填入数据库连接串
```

### 4. 初始化数据库

```bash
cd server
pnpm prisma:push
```

### 5. 一键启动三个服务

```bash
# 回到根目录
pnpm dev-all
```

服务地址：
- 后端 API：http://localhost:3000
- 管理后台：http://localhost:3001
- 博客前台：http://localhost:3002

### 6. 首次注册管理员

打开 http://localhost:3001/login，输入用户名密码点注册，**完事注释 `Login.tsx` 里的注册按钮**。

## 核心特性

### 后端亮点
- ✅ **通用 RESTful 资源中间件**：一套路由处理 7 张数据表
- ✅ **Prisma 5**：类型安全的 ORM，关联查询更优雅
- ✅ **PostgreSQL**：关系型数据库，比 MongoDB 更适合博客的关联场景
- ✅ **JWT + bcryptjs**：无状态认证 + 密码加密

### Admin 端亮点
- ✅ **通用 CRUD Hook**（`useCrudList`）：消除 7 个 List 页的重复代码
- ✅ **Ant Design 5**：组件丰富，UI 统一
- ✅ **Redux Toolkit**：现代化状态管理，支持 localStorage 持久化
- ✅ **TypeScript**：全链路类型安全

### Web 端亮点
- ✅ **React 19**：最新版 React，性能更好
- ✅ **Markdown 渲染 + 代码高亮**：技术博客必备
- ✅ **响应式布局**：适配桌面端和移动端
- ✅ **NProgress 进度条**：路由切换体验流畅

## API 接口

### Admin（需鉴权）
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /admin/api/login | 登录 |
| POST | /admin/api/upload | 上传文件 |
| * | /admin/api/rest/:resource | 通用 CRUD（7 张表） |

### Web（公开）
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /web/api/articles/:page | 文章分页 |
| GET | /web/api/articles/list/:id | 文章详情 |
| GET | /web/api/archive | 归档 |
| GET | /web/api/tags | 标签 |
| POST | /web/api/comments | 发表评论 |

## 改造对比

| 原项目（iBlog Vue） | 新项目（iBlog-React） |
|---|---|
| Vue 2.6 | **React 19** |
| Vuex 3 | **Redux Toolkit** |
| Element-UI | **Ant Design 5** |
| Vue Router 3 | **React Router 6** |
| Mongoose + MongoDB | **Prisma + PostgreSQL** |
| Webpack | **Vite 5** |
| JavaScript | **TypeScript** |
