// 全局通用类型
export interface IBaseEntity {
  id: number
  createdAt?: string
  updatedAt?: string
}

export interface IArticle extends IBaseEntity {
  title: string
  icon?: string
  body: string
  views: number
  msgs: number
  categories?: ICategory[]
}

export interface ICategory extends IBaseEntity {
  name: string
}

export interface IComment extends IBaseEntity {
  nickName: string
  avatarImg?: string
  content: string
  byAiteName?: string
  parentId?: number | null
  articleId?: number | null
  userId?: number | null
}

export interface IMessage extends IBaseEntity {
  nickName: string
  avatarImg?: string
  content: string
  byAiteName?: string
  parentId?: number | null
  userId?: number | null
}

export interface ILink extends IBaseEntity {
  name: string
  site: string
  description?: string
  icon?: string
}

export interface IUser extends IBaseEntity {
  nickName: string
  email?: string
  url?: string
  avatarImg?: string
}

export interface IAdminUser extends IBaseEntity {
  username: string
  password?: string
}

export interface ILoginPayload {
  username: string
  password: string
}

export interface ILoginResponse {
  token: string
  username: string
}
