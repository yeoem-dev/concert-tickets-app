<template>
    <form @submit.prevent="acheterBillets" class="space-y-4">
      <!-- Acheteur -->
      <select v-model="form.acheteurId" class="input" required>
        <option disabled value="">Choisissez un acheteur</option>
        <option v-for="a in acheteurs" :key="a.id" :value="a.id">
          {{ a.nom }} - {{ a.email }}
        </option>
      </select>
  
      <!-- Concert -->
      <select v-model="form.concertId" class="input" required>
        <option disabled value="">Choisissez un concert</option>
        <option v-for="c in concerts" :key="c.id" :value="c.id">
          {{ c.nomConcert }} - {{ new Date(c.date).toLocaleString() }}
        </option>
      </select>
  
      <!-- Catégorie -->
      <select v-model="form.categorieId" class="input" required>
        <option disabled value="">Choisissez une catégorie</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.libelle }} - {{ cat.prix }} €
        </option>
      </select>
  
      <!-- Quantité -->
      <div class="flex items-center space-x-4">
        <label>Quantité :</label>
        <button
          type="button"
          @click="form.quantite--"
          class="btn-secondary"
          :disabled="form.quantite <= 1"
        >
          -
        </button>
        <span>{{ form.quantite }}</span>
        <button type="button" @click="form.quantite++" class="btn-secondary">
          +
        </button>
      </div>
  
      <!-- Acheter -->
      <button type="submit" class="btn-primary">Acheter</button>
  
      <!-- Modal -->
      <dialog ref="modal" class="rounded p-4 shadow-md">
        <p>{{ modalMessage }}</p>
        <button @click="$refs.modal.close()" class="mt-4 text-blue-600 underline">
          Fermer
        </button>
      </dialog>
    </form>
  </template>
  
  <script>
  export default {
    name: "BilletForm",
    data() {
      return {
        form: {
          acheteurId: "",
          concertId: "",
          categorieId: "",
          quantite: 1,
        },
        acheteurs: [],
        concerts: [],
        categories: [],
        modalMessage: "",
      };
    },
    methods: {
      async fetchAcheteurs() {
        const res = await fetch("/acheteurs");
        this.acheteurs = await res.json();
      },
      async fetchConcerts() {
        const res = await fetch("/concerts");
        this.concerts = await res.json();
      },
      async fetchCategories() {
        const res = await fetch("/categories");
        this.categories = await res.json();
      },
  
      async acheterBillets() {
        const payload = {
          acheteurId: this.form.acheteurId,
          concertId: this.form.concertId,
          categorieId: this.form.categorieId,
        };
  
        try {
          for (let i = 0; i < this.form.quantite; i++) {
            const res = await fetch("/billets", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
  
            if (!res.ok) {
              throw new Error(`Échec de la requête (billet ${i + 1})`);
            }
          }
  
          this.modalMessage = `✅ Achat réussi : ${this.form.quantite} billet(s) créés.`;
          this.$refs.modal.showModal();
          this.resetForm();
        } catch (err) {
          this.modalMessage = `❌ Une erreur s'est produite lors de l'achat.`;
          this.$refs.modal.showModal();
          console.error("Erreur lors de l'achat :", err);
        }
      },
  
      resetForm() {
        this.form = {
          acheteurId: "",
          concertId: "",
          categorieId: "",
          quantite: 1,
        };
      },
    },
    mounted() {
      this.fetchAcheteurs();
      this.fetchConcerts();
      this.fetchCategories();
    },
  };
  </script>
  
  <style scoped>
  .input {
    @apply w-full p-2 border rounded;
  }
  .btn-primary {
    @apply bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700;
  }
  .btn-secondary {
    @apply bg-gray-300 px-3 py-1 rounded;
  }
  dialog {
    @apply bg-white w-full max-w-md border border-gray-300;
  }
  </style>
  