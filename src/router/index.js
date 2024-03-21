import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/search',
      name: 'Menu',
      component: () => import('../pages/Menu.vue')
    },
    {
      path: '/item',
      name: 'Item',
      component: () => import('../pages/Item.vue')
    },
    {
      path: '/orders',
      name: 'Orders',
      component: () => import('../pages/Orders.vue')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('../pages/Cart.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../pages/Profile.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
