<template>
  <div class="login">
    <input v-model="username" placeholder="Nom d'utilisateur" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button class="btn" @click="handleLogin">Se connecter</button>
    <router-link to="/signup">Se créer un compte</router-link>
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
div {
  height: 30vh;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>