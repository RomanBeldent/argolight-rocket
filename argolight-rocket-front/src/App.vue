<template>  
  <button @click="logout" class="btn logout">Se déconnecter</button>
  <h1>Argolight Rocket Project x SpaceX </h1>
  <RouterView />
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  width:70%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
