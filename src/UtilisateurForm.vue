<template>
  <form @submit.prevent="submitForm" class="bg-white p-4 rounded shadow">
    <div class="mb-2">
      <label class="block">Nom</label>
      <input v-model="nom" type="text" class="input" required />
    </div>
    <div class="mb-2">
      <label class="block">Email</label>
      <input v-model="email" type="email" class="input" required />
    </div>
    <button type="submit" class="btn-primary">Créer {{ type === 'acheteurs' ? 'Acheteur' : 'Organisateur' }}</button>
  </form>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true // 'acheteurs' ou 'organisateurs'
    }
  },
  data() {
    return {
      nom: '',
      email: ''
    };
  },
  methods: {
    async submitForm() {
      const endpoint = this.type === 'acheteurs' ? '/acheteurs' : '/organisateurs';
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nom: this.nom, email: this.email })
        });

        if (!res.ok) throw new Error('Échec de la création');

        this.nom = '';
        this.email = '';
        this.$emit('created');
      } catch (err) {
        console.error('Erreur lors de la création :', err);
      }
    }
  }
};
</script>

<style scoped>
.input {
  @apply w-full p-2 border rounded;
}
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
}
</style>
