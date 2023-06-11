import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotificationsView from '@/views/NotificationsView.vue'
import IncidencesView from '@/views/IncidencesView.vue'
import LoginView from '@/views/LoginView.vue'
import ClassroomsView from '@/views/ClassroomsView.vue'
import BookingsView from '@/views/BookingsView.vue'
import UsersView from '@/views/UsersView.vue'

import { Auth } from '@/config/firebase'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: LoginView
  },

  {
    path: '/',
    name: 'home',
    component: HomeView,
   meta:{requiresAuth:true}
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: NotificationsView,
    meta:{requiresAuth:true}
  },
  {
    path: '/incidences',
    name: 'incidences',
    component: IncidencesView,
    meta:{requiresAuth:true}
  },
  {
    path: '/classrooms',
    name: 'classrooms',
    component: ClassroomsView,
    meta:{requiresAuth:true}
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: BookingsView,
    meta:{requiresAuth:true}
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
    meta:{requiresAuth:true}
  }

]

const router = new VueRouter({
  routes
})

// Proteger rutas

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth) {
    const currentUser = await new Promise((resolve, reject) => {
      const unsubscribe = Auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
    
    if (!currentUser) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
