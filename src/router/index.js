import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/index.vue'),
      meta: {
        title: 'Dashboard'
      }
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('@/pages/usuarios/index.vue'),
      meta: {
        title: 'Gestión de Usuarios'
      }
    },
    {
      path: '/fotos',
      name: 'fotos',
      component: () => import('@/pages/fotos/index.vue'),
      meta: {
        title: 'Galería de Fotos'
      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Dimerc Web` 
  next()
})

export default router
