<template>
  <div id="app">
    <h1>Argolight Rocket Project x SpaceX </h1>
    <RouterView />
  <span class="footer">Argolight Company © Mini-project by Roman Beldent</span>
  </div>
</template>

<script>

export default {
  methods: {
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

.footer {
  margin: 50px 0 30px 0;
}

</style>
