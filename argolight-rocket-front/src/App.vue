<template>
  <div id="app">
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

export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'Login' });
    }
  },
  name: 'App',
  components: {
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
  width: 135%;
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info p {
  margin-right: 30px;
}
</style>
