<template>
    <div class="home">
      <h1>Bienvenue sur la page d'accueil</h1>
      <p>
        Vous êtes connecté avec succès !
      </p>
      <button @click="logout">Se déconnecter</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        localStorage.removeItem('token')
        this.$router.push({ name: 'Login' })
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles spécifiques à ce composant */
  .home {
    text-align: center;
    margin-top: 50px;
  }
  </style>