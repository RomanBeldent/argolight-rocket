<template>
  <div>
    <input v-model="username" placeholder="Nom d'utilisateur" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="handleLogin">Se connecter</button>
  </div>
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
        });

        const data = await response.json();

        localStorage.setItem('token', data.token);
        router.push({ name: 'RocketsView' });
        console.log('Connecté avec succès', data);
      } catch (error) {
        console.error('Erreur de connexion', error);
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