<template>
  <form class="user-form" @submit.prevent="handleSignup">
    <p>Création d'un nouveau compte</p>
    <div>
      <label for="username"></label>
      <input id="username" v-model="username" type="text" placeholder="Nom d'utilisateur" required />
    </div>
    <div>
      <label for="password"></label>
      <input id="password" v-model="password" type="password" placeholder="Mot de passe" required />
    </div>
    <div>
      <button type="submit" class="btn">S'inscrire</button>
    </div>
    <router-link class="link" to="/">Retour</router-link>
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

<style scoped></style>