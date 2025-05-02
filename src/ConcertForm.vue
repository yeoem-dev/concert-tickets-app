<template>
  <form @submit.prevent="submitConcert" class="space-y-4">
    <input v-model="form.nomConcert" placeholder="Nom du concert" class="input" />
    <input v-model="form.lieu" placeholder="Lieu" class="input" />
    <input type="datetime-local" v-model="form.date" class="input" />

    <select v-model="form.organisateurId" class="input">
      <option value="" disabled>Choisissez un organisateur</option>
      <option v-for="org in organisateurs" :key="org.id" :value="org.id">
        {{ org.nom }} ({{ org.email }})
      </option>
    </select>

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
        organisateurId: ''
      },
      organisateurs: []
    };
  },
  methods: {
    async fetchOrganisateurs() {
      const res = await fetch('/utilisateurs/organisateurs'); // ou '/organisateurs' selon ton API
      this.organisateurs = await res.json();
    },
    async submitConcert() {
      await fetch('/concerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      });
      this.$emit('created');
    }
  },
  mounted() {
    this.fetchOrganisateurs();
  }
};
</script>

<style scoped>
.input {
  @apply w-full border p-2 rounded;
}
</style>
