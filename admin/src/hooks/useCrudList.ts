// 通用 CRUD 列表页 Hook
// 消除 7 个 List 页面的重复代码（fetch / remove 逻辑）
import { useState, useEffect, useCallback } from 'react'
import { message, Modal } from 'antd'
import { fetchList, deleteItem } from '@/api/crud'

export function useCrudList<T extends { id: number | string }>(resource: string) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)

  // 加载列表
  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchList<T>(resource)
      setItems(data)
    } finally {
      setLoading(false)
    }
  }, [resource])

  // 删除
  const remove = useCallback(
    (id: number | string) => {
      Modal.confirm({
        title: '提示',
        content: '是否确定要删除？',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          await deleteItem(resource, id)
          message.success('删除成功')
          await load()
        },
      })
    },
    [resource, load]
  )

  useEffect(() => {
    load()
  }, [load])

  return { items, loading, load, remove, setItems }
}
