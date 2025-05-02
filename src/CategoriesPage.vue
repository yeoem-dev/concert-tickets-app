<template>
    <div>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-blue-700">Liste des catégories</h2>
        <button @click="showForm = !showForm" class="btn-primary">
          {{ showForm ? 'Fermer' : 'Ajouter une catégorie' }}
        </button>
      </div>
  
      <div v-if="showForm" class="mb-6">
        <form @submit.prevent="createCategorie" class="space-y-2">
          <input
            v-model="newCategorie.libelle"
            type="text"
            placeholder="Libellé"
            class="input"
          />
          <input
            v-model.number="newCategorie.prix"
            type="number"
            placeholder="Prix"
            class="input"
          />
          <button type="submit" class="btn-primary">Enregistrer</button>
        </form>
      </div>
  
      <ul>
        <li
          v-for="categorie in categories"
          :key="categorie.id"
          class="mb-2 p-2 bg-white rounded shadow"
        >
          <p class="font-semibold">{{ categorie.libelle }}</p>
          <p class="text-sm text-gray-600">Prix: {{ categorie.prix }} €</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CategoriesPage',
    data() {
      return {
        categories: [],
        showForm: false,
        newCategorie: {
          libelle: '',
          prix: null
        }
      }
    },
    methods: {
      async fetchCategories() {
        try {
          const res = await fetch('/categories');
          this.categories = await res.json();
        } catch (err) {
          console.error('Erreur lors de la récupération des catégories :', err);
        }
      },
      async createCategorie() {
        try {
          const res = await fetch('/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.newCategorie)
          });
          if (!res.ok) throw new Error('Création échouée');
          this.newCategorie = { libelle: '', prix: null };
          this.showForm = false;
          this.fetchCategories();
        } catch (err) {
          console.error('Erreur lors de la création :', err);
        }
      }
    },
    mounted() {
      this.fetchCategories();
    }
  }
  </script>
  
  <style scoped>
  .input {
    @apply w-full border p-2 rounded;
  }
  .btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
  }
  </style>
  