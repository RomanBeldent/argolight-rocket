<template>
  <div id="app">
    <spring-spinner :animation-duration="3000" :size="60" color="#ff1d5e" />
    <div class="user-auth">
      <div class="user-info">
        <p>Roman</p>
        <button @click="logout" class="btn logout">Se déconnecter</button>
      </div>
    </div>
    <h1>Argolight Rocket Project x SpaceX </h1>
    <RouterView />
  </div>
</template>

<script>

import { SpringSpinner } from 'epic-spinners'

export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'Login' });
    }
  },
  name: 'App',
  components: {
    SpringSpinner
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-auth {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 25px 100px 0 0;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info p {
  margin-right: 30px;
}
</style>
