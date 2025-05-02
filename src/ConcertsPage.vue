<template>
    <div>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-blue-700">Liste des concerts</h2>
        <button @click="showForm = !showForm" class="btn-primary">
          {{ showForm ? 'Fermer' : 'Nouveau Concert' }}
        </button>
      </div>
  
      <div v-if="showForm" class="mb-6">
        <ConcertForm @created="fetchConcerts" />
      </div>
  
      <div class="grid gap-4">
        <div v-for="concert in concerts" :key="concert.id" class="p-4 bg-white rounded shadow">
          <h3 class="font-semibold">{{ concert.nomConcert }}</h3>
          <p>{{ concert.lieu }} - {{ new Date(concert.date).toLocaleString() }}</p>
          <p class="text-sm text-gray-500">Organisateur ID: {{ concert.organisateurId }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ConcertForm from './ConcertForm.vue'
  
  export default {
    name: 'ConcertsPage',
    components: { ConcertForm },
    data() {
      return {
        concerts: [],
        showForm: false
      };
    },
    methods: {
      async fetchConcerts() {
        try {
          const res = await fetch('/concerts');
          this.concerts = await res.json();
        } catch (err) {
          console.error('Erreur lors du chargement des concerts', err);
        }
      }
    },
    mounted() {
      this.fetchConcerts();
    }
  }
  </script>
  
  <style scoped>
  .btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
  }
  </style>
  