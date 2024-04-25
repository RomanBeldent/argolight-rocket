<template>
  <div class="rockets-list">
    <div class="rocket-banner" v-for="rocket in rockets" :key="rocket._id" @click="handleRocketClick(rocket._id)">
      <img :src="rocket.pictureUrl" alt="rocket image">
      <div class="rocket-name">
        {{ rocket.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'Login' });
    },
    handleRocketClick(rocketId) {
      const clickedRocket = this.rockets && this.rockets.find(rocket => rocket._id === rocketId);
      if (clickedRocket) {
        this.$router.push({ name: 'RocketDetail', params: { id: rocketId } });
      } else {
        console.warn(`Fusée avec l'ID ${rocketId} non trouvée`);
      }
    }
  },
  setup() {
    const rockets = ref([]);

    onMounted(async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/rockets', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const dataResponse = await response.json();
        console.log(dataResponse)
        rockets.value = dataResponse.data
      } catch (error) {
        console.error('Erreur lors de la récupération des fusées', error);
      }
    });

    return {
      rockets
    };
  }
};
</script>

<style scoped>
.rockets-list {
  width: 70vw;
}

.rocket-banner {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  cursor: pointer;
  margin: 50px;
  border-radius: 10px;
}

.rocket-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 36px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>