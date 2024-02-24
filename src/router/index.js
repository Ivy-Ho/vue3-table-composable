import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/user_table'
    },
    {
      path: '/user_table',
      name: 'user_table',
      component: () => import('@/views/UserTableView.vue')
    },
    {
      path: '/product_table',
      name: 'product_table',
      component: () => import('@/views/ProductTableView.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/user_table'
    }
  ]
})

export default router
