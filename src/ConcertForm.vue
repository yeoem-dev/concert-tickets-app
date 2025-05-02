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

    <!-- Catégories -->
    <div>
      <h3 class="text-lg font-bold text-blue-600">Catégories</h3>
      <div v-for="(cat, index) in form.categories" :key="index" class="flex gap-2 mb-2">
        <input v-model="cat.libelle" type="text" placeholder="Libellé" class="input flex-1" required />
        <input v-model.number="cat.prix" type="number" placeholder="Prix (€)" class="input w-32" required />
        <button type="button" @click="removeCategory(index)" class="btn-danger">✕</button>
      </div>
      <button type="button" @click="addCategory" class="btn-secondary">+ Ajouter une catégorie</button>
    </div>

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
        categories: []
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
    removeCategory(index) {
      this.form.categories.splice(index, 1);
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
