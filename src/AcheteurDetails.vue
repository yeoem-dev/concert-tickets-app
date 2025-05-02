<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Détails de {{ acheteur.nom }}</h2>
        <p>Email : {{ acheteur.email }}</p>

        <h3 class="mt-6 font-semibold">Billets achetés :</h3>
        <ul v-if="acheteur.billets?.length">
            <li v-for="billet in acheteur.billets" :key="billet.id" class="mt-2">
                🎫 {{ billet.nomConcert }} - {{ billet.libelleCategorie }} | {{ new Date(billet.dateAchat).toLocaleString('fr-FR') }}

            </li>
        </ul>


        <p v-else>Aucun billet trouvé.</p>
    </div>
</template>

<script>
export default {
    name: "AcheteurDetails",
    data() {
        return {
            acheteur: {},
        };
    },
    async mounted() {
        const id = this.$route.params.id;
        const res = await fetch(`/acheteurs/${id}/details`);
        this.acheteur = await res.json();
    },
};
</script>