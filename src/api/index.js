import axios from 'axios'
import { useTableStore } from '@/stores/table'

import { Swal2 } from '@/utils/sweetalert2.js'
// import { i18n } from '@/lang/index'
// const { t } = i18n.global

const userRequest = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json'
  }
})

userRequest.interceptors.request.use((config) => {
  // 觸發 Loading
  const tableStore = useTableStore()
  tableStore.fullscreenLoading = true
  return config
})

userRequest.interceptors.response.use(
  (res) => {
    // 關閉 Loading
    const tableStore = useTableStore()
    tableStore.fullscreenLoading = false
    return res
  },
  (err) => {
    // 關閉 Loading
    const tableStore = useTableStore()
    tableStore.fullscreenLoading = false

    if (err.response) {
      if (err.response.status === 404) {
        Swal2.showErrorMsg('發生錯誤', err.response.data.message)
      } else {
        Swal2.showErrorMsg('程式錯誤', '請重新操作，或聯絡管理員')
      }
    }
    if (!window.navigator.onLine) {
      Swal2.showErrorMsg('網頁連線錯誤', '請重新連線後重整網頁')
      return
    }
    return Promise.reject(err)
  }
)

export const apiGetUsers = () => userRequest.get('/users')
export const apiPostUsers = (postData) => userRequest.post('/users', postData)
export const apiPutUsers = (id, postData) => userRequest.put(`/users/${id}`, postData)
export const apiDeleteUsers = (id) => userRequest.delete(`/users/${id}`)
