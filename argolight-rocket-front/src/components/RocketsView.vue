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
        // Supprimez le token JWT du local storage ou d'un autre système de stockage
        localStorage.removeItem('token');
        
        // Redirigez vers la page de connexion ou une autre page appropriée
        this.$router.push({ name: 'Login' }); // Assurez-vous d'avoir une route avec name="Login"
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