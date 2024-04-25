<template>
  <div v-if="rocket">
    <h1>{{ rocket.name }}</h1>
    <img :src="rocket.pictureUrl" alt="Rocket Image">
    <!-- Autres détails de la fusée -->
  </div>
  <div v-else>
    <p>Fusée non trouvée</p>
  </div>
    <router-link to="/rockets">Retour</router-link>
    </template>

<script>
import { ref, onMounted } from 'vue';

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const rocket = ref(null);

    onMounted(async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/rockets/${props.id}`, {  // Utilisation de props.id
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const dataResponse = await response.json();
        rocket.value = dataResponse.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la fusée', error);
      }
    });

    return {
      rocket
    };
  }
};
</script>
