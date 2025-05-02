<template>
    <div>
      <div class="flex justify-between items-center mb-4">
        <div class="flex gap-4">
          <button
            :class="['px-4 py-2 rounded', currentType === 'acheteurs' ? 'bg-blue-600 text-white' : 'bg-gray-200']"
            @click="currentType = 'acheteurs'"
          >Acheteurs</button>
  
          <button
            :class="['px-4 py-2 rounded', currentType === 'organisateurs' ? 'bg-blue-600 text-white' : 'bg-gray-200']"
            @click="currentType = 'organisateurs'"
          >Organisateurs</button>
        </div>
  
        <button @click="showForm = !showForm" class="btn-primary">
          {{ showForm ? 'Fermer' : 'Nouveau ' + (currentType === 'acheteurs' ? 'Acheteur' : 'Organisateur') }}
        </button>
      </div>
  
      <div v-if="showForm" class="mb-4">
        <AcheteurForm v-if="currentType === 'acheteurs'" @created="fetchUtilisateurs" />
        <OrganisateurForm v-else @created="fetchUtilisateurs" />
      </div>
  
      <div class="grid gap-3">
        <div v-for="u in utilisateurs" :key="u.id" class="bg-white p-4 rounded shadow">
          <p class="font-semibold">{{ u.nom }}</p>
          <p class="text-sm text-gray-600">{{ u.email }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AcheteurForm from './AcheteurForm.vue'
  import OrganisateurForm from './OrganisateurForm.vue'
  
  export default {
    name: 'UtilisateursPage',
    components: { AcheteurForm, OrganisateurForm },
    data() {
      return {
        currentType: 'acheteurs',
        utilisateurs: [],
        showForm: false
      }
    },
    methods: {
      async fetchUtilisateurs() {
        const endpoint = this.currentType === 'acheteurs' ? '/acheteurs' : '/organisateurs'
        const res = await fetch(endpoint)
        this.utilisateurs = await res.json()
      }
    },
    mounted() {
      this.fetchUtilisateurs()
    },
    watch: {
      currentType() {
        this.fetchUtilisateurs()
        this.showForm = false
      }
    }
  }
  </script>
  
  <style scoped>
  .btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
  }
  </style>
  