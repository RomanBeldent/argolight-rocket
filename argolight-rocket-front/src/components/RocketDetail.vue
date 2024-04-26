<template>
    <h1 v-if="rocket">{{ rocket.name }}</h1>
  </template>
  
  <script>
  export default {
    name: "RocketView",
    props: {
      rocketId: String
    },
    data() {
      return {
        rocket: null
      };
    },
    async mounted() {
      try {
        
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/rockets/${this.rocketId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
  
        const dataResponse = await response.json();
        this.rocket = dataResponse.data;
      } catch (error) {
        console.error('Erreur lors de la récupération de la fusée', error);
      }
    }
  };
  </script>