import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserProfileView from '../views/UserProfileView.vue';
import UserSpaceView from '../views/UserSpaceView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import NotFoundView from '../views/NotFoundView.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userprofile',
    name: 'userprofile',
    component: UserProfileView
  },
  {
    path: '/userspace',
    name: 'userspace',
    component: UserSpaceView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/404',
    name: '404',
    component: NotFoundView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
