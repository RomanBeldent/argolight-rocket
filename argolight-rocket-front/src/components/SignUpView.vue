<template>
    <div>
      <h2>Créer un compte</h2>
      <form @submit.prevent="handleSignup">
        <div>
          <label for="username">Nom d'utilisateur:</label>
          <input id="username" v-model="username" type="text" placeholder="Nom d'utilisateur" required />
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input id="password" v-model="password" type="password" placeholder="Mot de passe" required />
        </div>
        <div>
          <button type="submit">S'inscrire</button>
        </div>
      </form>
    </div>
    <router-link to="/">Retour</router-link>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const username = ref('');
      const password = ref('');
      const router = useRouter();
  
      const handleSignup = async () => {
        try {
          const response = await fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username.value,
              password: password.value
            })
          });
  
          const data = await response.json();
          if (data.message === 'User created successfully') {
            console.log('Success !', data);
            router.push({ name: 'Login' });
          } else {
            console.error('Error during account creation', data.message);
          }
        } catch (error) {
          console.error('Error during account creation', error);
        }
      };
  
      return {
        username,
        password,
        handleSignup
      };
    }
  };
  </script>
  
  <style scoped>
  </style>