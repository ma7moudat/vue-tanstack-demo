import { createRouter, createWebHistory } from 'vue-router'
import QuoteView from '../views/QuoteView.vue'
import QuoteClassicView from '@/views/QuoteClassicView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/quote-classic'
    },
    {
      path: '/quote-classic',
      name: 'quote-classic',
      component: QuoteClassicView
    },
    {
      path: '/quote',
      name: 'quote',
      component: QuoteView
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: () => import('../views/PostView.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../views/PostsView.vue')
    }
  ]
})

export default router
