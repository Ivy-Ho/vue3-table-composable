import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tableOne',
      name: 'table_one',
      component: () => import('@/views/TableOneView.vue')
    },
    {
      path: '/tableTwo',
      name: 'table_two',
      component: () => import('@/views/TableTwoView.vue')
    }
  ]
})

export default router
