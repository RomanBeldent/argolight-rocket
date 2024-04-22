import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: 'Login',
    component: () => import('../components/LoginView.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../components/SignUpView.vue'),
  },
  {
    path: '/rockets',
    name: 'Rockets',
    component: () => import('../components/RocketsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;