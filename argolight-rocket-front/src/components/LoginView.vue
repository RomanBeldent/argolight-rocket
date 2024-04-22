<template>
    <div>
      <input v-model="username" placeholder="Nom d'utilisateur" />
      <input v-model="password" type="password" placeholder="Mot de passe" />
      <button @click="handleLogin">Se connecter</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await fetch('http://localhost:3000/user/signin', {
            
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password
            })
          });
  
          const data = await response.json();
          
          // Stocker le token JWT dans le local storage ou une autre méthode de stockage
          localStorage.setItem('token', data.token);
  
          // Rediriger ou afficher un message de succès
          console.log('Connecté avec succès', data);
        } catch (error) {
          console.error('Erreur de connexion', error);
        }
      }
    }
  };
  </script>