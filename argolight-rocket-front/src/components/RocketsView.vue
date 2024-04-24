<template>
  <div>
    <h2>Liste des fusées</h2>
    <router-link to="/">Retour</router-link>
    <button @click="logout">Se déconnecter</button>
    <ul>
      <li v-for="rocket in rockets" :key="rocket._id">
        <h3>{{ rocket.name }}</h3>
        <p>{{ rocket.description }}</p>
        <img :src="rocket.pictureUrl" alt="Rocket" style="max-width: 100%; height: auto;">
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'Login' });
    }
  },
  setup() {
    const rockets = ref([]);

    onMounted(async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/rockets', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const dataResponse = await response.json();
        console.log(dataResponse)
        rockets.value = dataResponse.data
      } catch (error) {
        console.error('Erreur lors de la récupération des fusées', error);
      }
    });

    return {
      rockets
    };
  }
};
</script>

<style scoped>
/* Styles spécifiques à ce composant */
</style>