import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'
import './assets/css/styles.css'

const app = createApp(App)

app.use(router)
    .mount('#app')