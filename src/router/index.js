import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../pages/Menu.vue')
    },
    {
      path: '/item',
      name: 'item',
      component: () => import('../pages/Item.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../pages/Orders.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../pages/Cart.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../pages/Profile.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
