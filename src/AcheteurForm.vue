<template>
    <form @submit.prevent="submitForm" class="bg-white p-4 rounded shadow">
      <input v-model="nom" type="text" placeholder="Nom de l'acheteur" class="input" required />
      <input v-model="email" type="email" placeholder="Email" class="input" required />
      <button class="btn-primary mt-2">Créer</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nom: '',
        email: ''
      }
    },
    methods: {
      async submitForm() {
        await fetch('/acheteurs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nom: this.nom, email: this.email })
        })
        this.$emit('created')
        this.nom = ''
        this.email = ''
      }
    }
  }
  </script>
  