import { createRouter, createWebHistory } from 'vue-router'
import AppHome from './AppHome.vue'
import ConcertsPage from './ConcertsPage.vue'
import UtilisateursPage from './UtilisateursPage.vue'

const routes = [
  { path: '/', component: AppHome },
  { path: '/concerts', component: ConcertsPage },
  { path: '/utilisateurs', component: UtilisateursPage },
  
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
