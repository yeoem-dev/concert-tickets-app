// App.vue
<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <nav class="container mx-auto flex justify-between items-center p-4">
        <h1 class="text-2xl font-bold text-blue-600">🎟️ Concert Tickets App</h1>
        <ul class="flex gap-4 text-blue-600">
          <li><router-link to="/" class="hover:underline">Accueil</router-link></li>
          <li><router-link to="/concerts" class="hover:underline">Concerts</router-link></li>
          <li><router-link to="/billets" class="hover:underline">Billets</router-link></li>
          <li><router-link to="/utilisateurs" class="hover:underline">Utilisateurs</router-link></li>
          <li><router-link to="/categories" class="hover:underline">Catégories</router-link></li>
        </ul>
      </nav>
    </header>

    <main class="container mx-auto py-6 px-4">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
ul li {
  @apply cursor-pointer;
}
</style>
