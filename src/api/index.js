import axios from 'axios'
import { useTableStore } from '@/stores/table'

import { Swal2 } from '@/utils/sweetalert2.js'

const userRequest = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json'
  }
})

userRequest.interceptors.request.use((config) => {
  const tableStore = useTableStore()
  tableStore.fullscreenLoading = true
  return config
})

userRequest.interceptors.response.use(
  (res) => {
    const tableStore = useTableStore()
    tableStore.fullscreenLoading = false
    return res
  },
  (err) => {
    const tableStore = useTableStore()
    tableStore.fullscreenLoading = false

    if (err.response && err.response.status === 404) {
      Swal2.showErrorMsg('Error Occurred', err.response.data.message)
    } else {
      Swal2.showErrorMsg('Program Error', 'Please try again or contact the administrator')
    }

    if (!window.navigator.onLine) {
      Swal2.showErrorMsg('Network Connection Error', 'Please reconnect and refresh the page')
      return
    }
    return Promise.reject(err)
  }
)

// users
export const apiGetUsers = () => userRequest.get('/users')
export const apiPostUsers = (postData) => userRequest.post('/users', postData)
export const apiPutUsers = (id, postData) => userRequest.put(`/users/${id}`, postData)
export const apiDeleteUsers = (id) => userRequest.delete(`/users/${id}`)

// products
export const apiGetProducts = () => userRequest.get('/products')
export const apiPostProducts = (postData) => userRequest.post('/products', postData)
export const apiPutProducts = (id, postData) => userRequest.put(`/products/${id}`, postData)
export const apiDeleteProducts = (id) => userRequest.delete(`/products/${id}`)
