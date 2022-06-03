import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RSVPViewVue from '../views/RSVPView.vue';
import AdminViewVue from '../views/AdminView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/rsvp',
      name: 'rsvp',
      component: RSVPViewVue,
    },
    {
      path: '/admin',
      name: 'admin',
      component: RSVPViewVue,
    },
  ],
});

export default router;
