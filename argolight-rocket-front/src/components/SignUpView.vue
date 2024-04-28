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
      <label for="confirmPassword"></label>
      <input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="Confirmez le mot de passe"
        required />
    </div>
    <div>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
    <div>
      <button type="submit" class="btn">Créer</button>
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
    const confirmPassword = ref('');
    const errorMessage = ref('');

    const handleSignup = async () => {
      errorMessage.value = '';
      if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Les mots de passe ne correspondent pas';
        return;
      }
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
          errorMessage.value = 'Le nom d\'utilisateur est déjà pris. Veuillez en utiliser un autre.'
          console.error('Error during account creation', data.message);
        }
      } catch (error) {
        errorMessage.value = 'Erreur lors de la création du compte. Vous pouvez utiliser ( username: roman / password: roman ) en cas de problème de création.';
        console.error('Error during account creation', error);
      }
    };

    return {
      username,
      password,
      confirmPassword,
      errorMessage,
      handleSignup
    };
  }
};
</script>

<style scoped></style>