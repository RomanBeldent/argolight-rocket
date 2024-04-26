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
  },
  {
    path: '/rockets/:id',
    name: 'RocketDetail',
    component: () => import('../components/RocketDetail.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
})

export default router;