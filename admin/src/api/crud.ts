// 通用 CRUD API（基于通用 RESTful 资源接口）
import http from './http'

/** 获取资源列表 */
export const fetchList = <T>(resource: string) =>
  http.get<T[]>(`/rest/${resource}`).then((r) => r.data)

/** 获取资源详情 */
export const fetchDetail = <T>(resource: string, id: number | string) =>
  http.get<T>(`/rest/${resource}/${id}`).then((r) => r.data)

/** 创建资源 */
export const createItem = <T>(resource: string, payload: Partial<T>) =>
  http.post<T>(`/rest/${resource}`, payload).then((r) => r.data)

/** 更新资源 */
export const updateItem = <T>(resource: string, id: number | string, payload: Partial<T>) =>
  http.put<T>(`/rest/${resource}/${id}`, payload).then((r) => r.data)

/** 删除资源 */
export const deleteItem = (resource: string, id: number | string) =>
  http.delete(`/rest/${resource}/${id}`).then((r) => r.data)
