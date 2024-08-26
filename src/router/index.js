import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import NotFound from '../views/404.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Setting from '../views/Setting.vue'
import Trip from "../views/Trip.vue";
import Wish from '../views/Wish.vue'
import Link from '../views/Link.vue'
import Author from '../views/Author.vue'
import Confirm from '../views/Confirm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      hideHeader: true
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/trip',
    name: 'Trip',
    component: Trip
  },
  {
    path: '/wish',
    name: 'Wish',
    component: Wish
  },
  {
    path: '/link',
    name: 'Link',
    component: Link
  },
  {
    path: '/author',
    name: 'Author',
    component: Author
  },
  {
    path: '/resume',
    name: 'Resume',
    meta: {
      isExternalLink: true,
      targetUrl: 'https://resume.qnmdmyy.top'
    }
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: Confirm,
    meta: {
      hideHeader: true
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {

  if (to.meta && to.meta.isExternalLink) {
    const targetUrl = to.meta.targetUrl;
    store.commit('setTargetUrl', targetUrl)
    next('/confirm');
  }

  next();

})

export default router
