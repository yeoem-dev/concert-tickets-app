import { createRouter, createWebHistory } from 'vue-router'
import AppHome from './AppHome.vue'
import ConcertsPage from './ConcertsPage.vue'
import UtilisateursPage from './UtilisateursPage.vue'
import BilletForm from './BilletForm.vue'
import CategoriesPage from './CategoriesPage.vue'
import AcheteurDetails from './AcheteurDetails.vue'
import OrganisateurDetails from './OrganisateurDetails.vue';


const routes = [
  { path: '/', component: AppHome },
  { path: '/concerts', component: ConcertsPage },
  { path: '/utilisateurs', component: UtilisateursPage },
  { path: '/billets', component: BilletForm },
  { path: '/categories', component: CategoriesPage },
  { path: '/acheteurs/:id/details', component: AcheteurDetails },
  { path: '/organisateurs/:id/details', component: OrganisateurDetails },

  
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
