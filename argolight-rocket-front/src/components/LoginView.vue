<template>
  <form class="user-form" @submit.prevent="handleLogin">
      <p>Bienvenue sur le mini-projet de Roman Beldent pour Argolight.<br> Si vous n'avez pas de compte, veuillez vous
        en créer un afin de vous connecter à l'application.</p>
      <div>
        <label for="username"></label>
        <input id="username" v-model="username" placeholder="Nom d'utilisateur" required />
      </div>
      <div>
        <label for="password"></label>
        <input id="password" v-model="password" type="password" placeholder="Mot de passe" required />
      </div>
      <div>
        <button type="submit" class="btn">Se connecter</button>
      </div>
      <router-link class="link" to="/signup">Se créer un compte</router-link>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
        })

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        localStorage.setItem('token', data.token);
        router.push({ name: 'Rockets' });
      } catch (error) {
        console.error('Connection error', error);
      }
    };

    return {
      username,
      password,
      handleLogin
    };
  }
};
</script>

<style scoped>
</style>