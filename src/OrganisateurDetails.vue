<template>
    <div>
      <h2 class="text-xl font-bold mb-4">Détails de l’organisateur</h2>
      <p><strong>Nom :</strong> {{ organisateur.nom }}</p>
      <p><strong>Email :</strong> {{ organisateur.email }}</p>
  
      <h3 class="mt-6 font-semibold">Concerts organisés :</h3>
      <ul v-if="organisateur.concerts?.length">
        <li v-for="concert in organisateur.concerts" :key="concert.id" class="mt-2">
          🎤 {{ concert.nomConcert }} | {{ concert.lieu }} |
          {{ new Date(concert.date).toLocaleString() }}
        </li>
      </ul>
      <p v-else>Aucun concert trouvé.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrganisateurDetails',
    data() {
      return {
        organisateur: {}
      };
    },
    async mounted() {
      const id = this.$route.params.id;
      try {
        const res = await fetch(`/organisateurs/${id}/details`);
        this.organisateur = await res.json();
      } catch (err) {
        console.error("Erreur lors du chargement des détails de l’organisateur :", err);
      }
    }
  };
  </script>
  
  <style scoped>
  ul li {
    @apply bg-white p-3 rounded shadow-sm;
  }
  </style>
  