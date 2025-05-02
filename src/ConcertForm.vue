<template>
  <form @submit.prevent="createConcert" class="space-y-4">

    <!-- Nom -->
    <input v-model="form.nomConcert" type="text" placeholder="Nom du concert" class="input" required />

    <!-- Lieu -->
    <input v-model="form.lieu" type="text" placeholder="Lieu" class="input" required />

    <!-- Date -->
    <input v-model="form.date" type="datetime-local" class="input" required />

    <!-- Organisateur -->
    <select v-model="form.organisateurId" class="input" required>
      <option disabled value="">Choisissez un organisateur</option>
      <option v-for="org in organisateurs" :key="org.id" :value="org.id">
        {{ org.nom }} - {{ org.email }}
      </option>
    </select>

    

    <!-- Créer -->
    <button type="submit" class="btn-primary">Créer le concert</button>
  </form>
</template>

<script>
export default {
  name: 'ConcertForm',
  data() {
    return {
      form: {
        nomConcert: '',
        lieu: '',
        date: '',
        organisateurId: '',
      },
      organisateurs: []
    }
  },
  methods: {
    async fetchOrganisateurs() {
      const res = await fetch('/organisateurs');
      this.organisateurs = await res.json();
    },
    addCategory() {
      this.form.categories.push({ libelle: '', prix: 0 });
    },
    
    async createConcert() {
      try {
        const res = await fetch('/concerts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        });
        if (!res.ok) throw new Error('Erreur lors de la création du concert');
        alert('Concert créé avec succès');
        this.$emit('created');
        // Optionnel : reset
        this.form = { nomConcert: '', lieu: '', date: '', organisateurId: '', categories: [] };
      } catch (err) {
        console.error('Erreur création concert:', err);
      }
    }
  },
  mounted() {
    this.fetchOrganisateurs();
  }
}
</script>

<style scoped>
.input {
  @apply w-full p-2 border rounded;
}
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
}
.btn-secondary {
  @apply bg-gray-300 px-3 py-1 rounded;
}
.btn-danger {
  @apply bg-red-500 text-white px-2 rounded hover:bg-red-600;
}
</style>
