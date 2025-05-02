
<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-blue-700">Liste des utilisateurs</h2>
      <select v-model="currentType" @change="fetchUtilisateurs" class="border p-2 rounded">
        <option value="acheteurs">Acheteurs</option>
        <option value="organisateurs">Organisateurs</option>
      </select>
      <button @click="showForm = !showForm" class="btn-primary ml-4">
        {{ showForm ? 'Fermer' : 'Créer ' + (currentType === 'acheteurs' ? 'Acheteur' : 'Organisateur') }}
      </button>
    </div>

    <div v-if="showForm" class="mb-6">
      <UtilisateurForm :type="currentType" @created="fetchUtilisateurs" />
    </div>

    <ul>
      <li v-for="utilisateur in utilisateurs" :key="utilisateur.id" class="mb-2 p-2 bg-white rounded shadow">
        <p class="font-semibold">{{ utilisateur.nom }}</p>
        <p class="text-sm text-gray-600">{{ utilisateur.email }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import UtilisateurForm from './UtilisateurForm.vue'

export default {
  name: 'UtilisateursPage',
  components: { UtilisateurForm },
  data() {
    return {
      currentType: 'acheteurs',
      utilisateurs: [],
      showForm: false
    }
  },
  methods: {
    async fetchUtilisateurs() {
      try {
        const res = await fetch(`/${this.currentType}`);
        if (!res.ok) throw new Error('Erreur de récupération');
        this.utilisateurs = await res.json();
      } catch (err) {
        console.error('Erreur lors de la récupération :', err);
      }
    }
  },
  mounted() {
    this.fetchUtilisateurs();
  }
}
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
}
</style>