<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <LoginView/>
</template>

<script>
import LoginView from './components/LoginView.vue'
export default {
  name: 'App',
  components: {
    LoginView
  }
}
</script>